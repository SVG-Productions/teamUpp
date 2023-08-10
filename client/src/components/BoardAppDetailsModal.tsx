import React, { useEffect, useState, useRef } from "react";
import ModalLayout from "../layouts/ModalLayout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { faEllipsisH, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import { formatSalary } from "../utils/formatSalary";
import { formatGeneralDate } from "../utils/dateFormatters";
import trimUrl from "../utils/trimUrl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DeleteListingModal from "./DeleteListingModal";
import { useBoard } from "../context/BoardContext";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import BoardAppDetail from "./BoardAppDetail";
import BoardAppShareSubmenu from "./BoardAppShareSubmenu";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import BoardAppDescription from "./BoardAppDescription";

const BoardAppDetailsModal = ({
  handleModal,
  task,
}: {
  handleModal: (bool: boolean) => void;
  task: any;
}) => {
  const { boardData, setBoardData } = useBoard();
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAppSubmenu, setShowAppSubmenu] = useState(false);
  const [showDeleteAppModal, setShowDeleteAppModal] = useState(false);

  const submenuRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(submenuRef, () => setShowAppSubmenu(false));

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${task.id}`);
      setAppData(data);
      setLoading(false);
    };
    fetchListingData();
  }, [task.id]);

  const handleDeleteAppState = () => {
    setBoardData((prev: any) => {
      const { [task.id]: deletedTask, ...remainingTasks } = prev.tasks;
      const newState = {
        ...prev,
        columns: {
          ...prev.columns,
          [task.statusId]: {
            ...prev.columns[task.statusId],
            taskIds: prev.columns[task.statusId].taskIds.filter(
              (id: string) => id !== task.id
            ),
          },
        },
        tasks: remainingTasks,
      };
      return newState;
    });
    handleModal(false);
  };

  const handleChangeStatus = async (statusId: any) => {
    const { title, taskIds } = boardData.columns[statusId];
    const oldStatusId = boardData.tasks[appData.id].statusId;

    setBoardData((prev: any) => {
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [appData.id]: {
            ...prev.tasks[appData.id],
            statusId,
            appStatus: title,
            index: taskIds.length,
          },
        },
        columns: {
          ...prev.columns,
          [statusId]: {
            ...prev.columns[statusId],
            taskIds: [...taskIds, appData.id],
          },
          [oldStatusId]: {
            ...prev.columns[oldStatusId],
            taskIds: prev.columns[oldStatusId].taskIds.filter(
              (id: any) => id !== appData.id
            ),
          },
        },
      };
    });
    try {
      await axios.patch(`/api/listings/${appData.id}`, {
        statusId,
        index: taskIds.length,
      });
    } catch (error) {
      toast.error(
        "Error updating applications. Refresh and try again.",
        basicToast
      );
    }
  };

  const handleCloseModals = () => {
    setShowDeleteAppModal(false);
    handleModal(false);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="flex flex-col bg-primary w-full h-full max-w-5xl
      p-5 mx-auto z-10 sm:h-3/5 sm:bg-secondary sm:rounded-[4px] sm:shadow-lg"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {showDeleteAppModal && (
              <DeleteListingModal
                handleModals={handleCloseModals}
                handleModal={setShowDeleteAppModal}
                handleState={handleDeleteAppState}
                id={appData.id}
              />
            )}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col mr-4 items-center sm:flex-row">
                <h2 className="sm:text-xl font-bold text-center">
                  {appData.companyName} - {appData.jobTitle}
                </h2>
                <span className="bg-secondary font-bold capitalize text-secondary rounded-sm text-sm py-0.5 px-1 mt-2 sm:bg-primary sm:mt-0 sm:ml-4">
                  {boardData.tasks[appData.id].appStatus}
                </span>
              </div>
              <div className="relative flex items-center gap-5">
                <BoardAppShareSubmenu
                  appData={appData}
                  setAppData={setAppData}
                />
                <FontAwesomeIcon
                  size="lg"
                  icon={faEllipsisH}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => setShowAppSubmenu(true)}
                />
                {showAppSubmenu && (
                  <div
                    ref={submenuRef}
                    className="absolute flex flex-col top-6 right-3 z-10"
                  >
                    <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
                    <div className="flex flex-col w-fit bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
                      <button
                        onClick={() => {
                          setShowAppSubmenu(false);
                          setShowDeleteAppModal(true);
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
                <FontAwesomeIcon
                  size="lg"
                  icon={faX}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => handleModal(false)}
                />
              </div>
            </div>
            <div
              id="main"
              className="flex flex-col-reverse h-fit gap-4 sm:flex-row sm:h-[90%]"
            >
              <div
                id="left"
                className="flex flex-col w-full p-1 mb-6 pr-3 gap-3 sm:overflow-y-auto sm:w-[55%] sm:mb-0"
              >
                <BoardAppDescription
                  data={appData.jobDescription}
                  name="jobDescription"
                  title="Job description"
                />
                <BoardAppDescription
                  data={appData.companyDetails}
                  name="companyDetails"
                  title="Company details"
                />
              </div>
              <div
                id="right"
                className="flex flex-col gap-2 w-full p-1 sm:w-[45%]"
              >
                <div
                  id="details"
                  className="border border-borderprimary rounded-[4px]"
                >
                  <h3 className="text-sm font-semibold py-1 px-3 border-b border-borderprimary">
                    Details
                  </h3>
                  <div className="flex flex-col gap-4 p-3">
                    <BoardAppDetail
                      title="Company"
                      value={appData.companyName}
                      name="companyName"
                      appId={appData.id}
                      setAppData={setAppData}
                    />
                    <BoardAppDetail
                      title="Job title"
                      value={appData.jobTitle}
                      name="jobTitle"
                      appId={appData.id}
                      setAppData={setAppData}
                    />
                    <BoardAppDetail
                      title="Location"
                      value={appData.location}
                      name="location"
                      appId={appData.id}
                      setAppData={setAppData}
                    />
                    <BoardAppDetail
                      title="Application link"
                      value={appData.jobLink}
                      name="jobLink"
                      appId={appData.id}
                      setAppData={setAppData}
                    />
                    <BoardAppDetail
                      title="Compensation"
                      value={formatSalary(
                        appData.salaryAmount,
                        appData.salaryFrequency
                      )}
                      name="salary"
                      appId={appData.id}
                      setAppData={setAppData}
                    />
                    <div className="flex items-center">
                      <span className="text-sm w-2/5 font-semibold">
                        Current status
                      </span>
                      <select
                        className="flex capitalize text-sm rounded-[4px] ml-1.5 px-1 py-0.5 bg-buttonPrimary focus:border-0"
                        onChange={(e) => handleChangeStatus(e.target.value)}
                        defaultValue={appData.statusId}
                      >
                        {boardData.columnOrder.map((id: any) => {
                          return (
                            <option
                              className={`cursor-pointer ${
                                boardData.tasks[appData.id].statusId === id &&
                                "hidden"
                              }`}
                              value={id}
                              key={id}
                            >
                              {boardData.columns[id].title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-tertiary text-xs">
                        Applied {formatGeneralDate(appData.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
