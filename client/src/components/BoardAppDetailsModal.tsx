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
import { TeamType } from "../../type-definitions";
import { useBoard } from "../context/BoardContext";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

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
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const submenuRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(submenuRef, () => setShowAppSubmenu(false));

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${task.id}`);
      setAppData(data);
      setLoading(false);
    };
    fetchListingData();
  }, []);

  const handleDeleteListing = () => {
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
  };

  const toggleTeamOption = (id: string) => {
    setSelectedTeams((prevSelected) => {
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item != id);
      } else {
        newArray.push(id);
        return newArray;
      }
    });
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
                handleState={handleDeleteListing}
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
                <FontAwesomeIcon
                  size="lg"
                  icon={faEllipsisH}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => setShowAppSubmenu(true)}
                />
                {showAppSubmenu && (
                  <div
                    ref={submenuRef}
                    className="absolute flex flex-col top-4 right-3 z-10"
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
                className="w-full p-1 mb-6 sm:overflow-y-auto sm:w-1/2 sm:mb-0"
              >
                <div className="mb-4">
                  <h3 className="font-bold text-sm mb-1">Description</h3>
                  <div className="text-sm">{parse(appData.jobDescription)}</div>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Company Details</h3>
                  <div className="text-sm">{parse(appData.companyDetails)}</div>
                </div>
              </div>
              <div
                id="right"
                className="flex flex-col gap-2 w-full p-1 sm:w-1/2"
              >
                <div
                  id="details"
                  className="border border-borderprimary rounded-[4px]"
                >
                  <h3 className="text-sm font-semibold py-1 px-3 border-b border-borderprimary">
                    Details
                  </h3>
                  <div className="flex flex-col gap-4 py-1 px-3">
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Company
                      </span>
                      <span className="text-sm w-3/5">
                        {appData.companyName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Job title
                      </span>
                      <span className="text-sm w-3/5">{appData.jobTitle}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Link to application
                      </span>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs w-3/5 truncate"
                        href={appData.jobLink}
                      >
                        {trimUrl(appData.jobLink)}
                      </a>
                    </div>
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Compensation
                      </span>
                      <span className="text-sm w-3/5">
                        {formatSalary(
                          appData.salaryAmount,
                          appData.salaryFrequency
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-2/5 font-semibold">
                        Current status
                      </span>
                      <select
                        className="flex capitalize text-sm gap-2 rounded-[4px] px-1 py-0.5 bg-buttonPrimary focus:border-0"
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
                <div
                  id="teamShare"
                  className="flex flex-col border h-full border-borderprimary rounded-[4px] overflow-auto"
                >
                  <h3 className="flex-initial h-fit text-sm font-semibold py-1 px-3 border-b border-borderprimary">
                    Share to teams
                  </h3>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-3">
                    <ul className="flex-grow grid grid-cols-2 gap-x-6 gap-y-2">
                      {boardData.teams.map((team: TeamType) => {
                        const isSelected = selectedTeams.includes(team.id);
                        return (
                          <li
                            key={team.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex gap-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={team.photo || team.avatar}
                              />
                              <span className="font-semibold">{team.name}</span>
                            </div>
                            <input
                              type="checkbox"
                              className="appearance-none rounded-full border border-borderprimary 
                              w-4 h-4 checked:bg-highlightSecondary"
                              checked={isSelected}
                              onChange={() => toggleTeamOption(team.id)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                    <button className="self-end">Share</button>
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
