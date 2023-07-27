import React, { FormEvent, useRef, useState } from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import axios from "axios";

const AppsColumn = ({
  column,
  tasks,
  index,
}: {
  column: any;
  tasks: any;
  index: number;
}) => {
  const [status, setStatus] = useState(column.title);
  const [editStatus, setEditStatus] = useState(column.title);
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const [showColumnSubmenu, setShowColumnSubmenu] = useState(false);
  const [showDeleteColumnModal, setShowDeleteColumnModal] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  const submenuRef = useRef<HTMLInputElement>(null);

  const handleCloseEdit = () => {
    setEditStatus(status);
    setShowStatusEdit(false);
  };

  const handleAcceptEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const oldStatus = status;
      axios.patch("/api/app-statuses", {
        newStatus: editStatus,
        oldStatus,
      });
      setStatus(editStatus);
      setShowStatusEdit(false);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
      handleCloseEdit();
    }
  };

  const handleCloseSubmenu = () => {
    setShowColumnSubmenu(false);
  };

  useOnClickOutside(editRef, handleCloseEdit);
  useOnClickOutside(submenuRef, handleCloseSubmenu);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="flex flex-col m-2 bg-secondary rounded-md w-[240px]"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div ref={editRef} className="flex justify-start p-2.5 items-center">
            {showStatusEdit && column.id !== "applied" ? (
              <div {...provided.dragHandleProps}>
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
                <div className="w-full" {...provided.dragHandleProps}>
                  <h3
                    onClick={() => setShowStatusEdit(true)}
                    className="capitalize text-sm text-primary font-bold"
                  >
                    {status}
                  </h3>
                </div>
                {column.id !== "applied" && (
                  <div className="relative">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faEllipsis}
                      className="pr-1 ml-auto text-tertiary cursor-pointer hover:text-primary"
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
                            onClick={() => setShowDeleteColumnModal(true)}
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
              </>
            )}
          </div>
          <StrictModeDroppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`flex-grow min-h-[10px] p-2 ${
                  showStatusEdit && "pt-0.5"
                }`}
                {...provided.droppableProps}
              >
                {tasks.map((task: any, index: number) => {
                  return <AppItem key={task.id} task={task} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      )}
    </Draggable>
  );
};

export default AppsColumn;
