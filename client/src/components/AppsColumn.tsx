import React, { FormEvent, useRef, useState, memo } from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import axios from "axios";
import DeleteAppStatusModal from "./DeleteAppStatusModal";
import { useBoard } from "../context/BoardContext";

const AppsColumn = ({
  column,
  index,
  setShowCreateApp,
  searchInput,
}: {
  column: any;
  index: number;
  setShowCreateApp: any;
  searchInput: string;
}) => {
  const { setBoardData } = useBoard();
  const [editStatus, setEditStatus] = useState(column.title);
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const [showColumnSubmenu, setShowColumnSubmenu] = useState(false);
  const [showDeleteColumnModal, setShowDeleteColumnModal] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  const submenuRef = useRef<HTMLInputElement>(null);

  const handleCloseEdit = () => {
    setEditStatus(column.title);
    setShowStatusEdit(false);
  };

  const handleAcceptEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const oldStatus = column;
      axios.patch(`/api/app-statuses/${oldStatus.id}`, {
        newStatus: editStatus,
      });
      setBoardData((prev: any) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [column.id]: { ...prev.columns[column.id], title: editStatus },
        },
      }));
      setShowStatusEdit(false);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
      handleCloseEdit();
    }
  };

  useOnClickOutside(editRef, handleCloseEdit);
  useOnClickOutside(submenuRef, () => setShowColumnSubmenu(false));

  return (
    <>
      {showDeleteColumnModal && (
        <DeleteAppStatusModal
          handleModal={setShowDeleteColumnModal}
          column={column}
        />
      )}
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div
            className="relative flex flex-col bg-secondary rounded-sm w-[228px]"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              ref={editRef}
              className="sticky top-0 flex bg-secondary rounded-sm justify-start w-[228px] min-h-[44px] p-2.5 items-center"
            >
              {showStatusEdit && column.title !== "applied" ? (
                <div className="w-full" {...provided.dragHandleProps}>
                  <form className="w-full relative" onSubmit={handleAcceptEdit}>
                    <input
                      className="border border-borderprimary w-full p-0.5 rounded font-semibold leading-tight focus:outline-bluegray"
                      id="app-status"
                      type="text"
                      autoFocus
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      autoComplete="off"
                    />
                    <div className="absolute flex mt-1.5 right-0 gap-2">
                      <FontAwesomeIcon
                        className="bg-tertiary py-1 px-1.5 rounded-sm cursor-pointer hover:bg-highlightSecondary"
                        icon={faX}
                        onClick={handleCloseEdit}
                      />
                      <button>
                        <FontAwesomeIcon
                          className="bg-tertiary p-1 rounded-sm cursor-pointer hover:bg-highlightSecondary"
                          icon={faCheck}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div
                    className="flex justify-between items-center text-tertiary w-full"
                    {...provided.dragHandleProps}
                  >
                    <h3
                      onClick={() => setShowStatusEdit(true)}
                      className="uppercase text-xs font-semibold"
                    >
                      {column.title}
                      <span className="ml-2">
                        {column.appIds.length !== 0 && column.appIds.length}
                      </span>
                    </h3>
                    {column.title !== "applied" &&
                      column.title !== "archived" &&
                      column.title !== "offer made" && (
                        <div className="relative">
                          <FontAwesomeIcon
                            size="lg"
                            icon={faEllipsis}
                            className="px-1 ml-auto text-tertiary cursor-pointer hover:text-primary"
                            onClick={() => setShowColumnSubmenu(true)}
                          />
                          {showColumnSubmenu && (
                            <div
                              ref={submenuRef}
                              className="absolute flex flex-col -right-5 z-10"
                            >
                              <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
                              <div className="flex flex-col w-fit bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
                                <button
                                  onClick={() => {
                                    setShowColumnSubmenu(false);
                                    setShowDeleteColumnModal(true);
                                  }}
                                  className="flex p-2 no-underline text-primary hover:bg-highlightSecondary"
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="mr-2 self-center"
                                  />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </>
              )}
            </div>
            <StrictModeDroppable droppableId={column.id} type="app">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`flex-grow min-h-[10px] p-2 rounded-sm ${
                    showStatusEdit && "pt-0.5"
                  }`}
                  {...provided.droppableProps}
                >
                  {column.apps
                    .filter(
                      (app: any) =>
                        app.jobTitle
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                        app.companyName
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                    )
                    .map((app: any, index: number) => {
                      return <AppItem key={app.id} app={app} index={index} />;
                    })}
                  {column.title === "applied" && (
                    <button
                      className="flex flex-end h-10 items-center w-full 
                    p-2 mb-1 cursor-pointer rounded-sm bg-secondary text-tertiary 
                    hover:bg-primary"
                      onClick={() => setShowCreateApp(true)}
                    >
                      <div
                        className={` ${snapshot.draggingOverWith && "hidden"}`}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          size="sm"
                          icon={faPlus}
                        />
                        <span className="text-sm font-semibold">
                          Create application
                        </span>
                      </div>
                    </button>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default memo(AppsColumn);
