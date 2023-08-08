import React, { useEffect, useState, useRef } from "react";
import ModalLayout from "../layouts/ModalLayout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import {
  faEllipsisH,
  faShareAlt,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import { formatSalary } from "../utils/formatSalary";
import { formatGeneralDate } from "../utils/dateFormatters";
import trimUrl from "../utils/trimUrl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DeleteListingModal from "./DeleteListingModal";
import { useBoard } from "../context/BoardContext";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import BoardDetail from "./BoardDetail";
import { TeamType } from "../../type-definitions";

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

  const [showShareSubmenu, setShowShareSubmenu] = useState(false);
  const [teamInput, setTeamInput] = useState("");
  const [showTeamList, setShowTeamList] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<TeamType[]>([]);

  const submenuRef = useRef<HTMLInputElement>(null);
  const shareRef = useRef<HTMLInputElement>(null);
  const teamsRef = useRef<HTMLInputElement>(null);

  const displayedTeams = boardData.teams
    .filter((team: TeamType) => {
      const isSelected = selectedTeams.find((st) => st.id === team.id);
      if (
        !team.name.toLowerCase().includes(teamInput.toLowerCase()) ||
        isSelected
      ) {
        return false;
      } else return true;
    })
    .map((team: TeamType) => {
      return (
        <li
          key={team.id}
          className="py-2 px-3 cursor-pointer flex items-center gap-4 hover:bg-tertiary hover:border-l-2 hover:border-l-blueGray hover:pl-2.5"
          onClick={() => toggleTeamOption(team)}
        >
          <img
            className="w-6 h-6 rounded-full"
            src={team.photo || team.avatar}
            alt={team.name}
          />
          <span className="font-semibold">{team.name}</span>
        </li>
      );
    });

  useOnClickOutside(submenuRef, () => setShowAppSubmenu(false));
  useOnClickOutside(shareRef, () => setShowShareSubmenu(false));
  useOnClickOutside(teamsRef, () => {
    setTeamInput("");
    setShowTeamList(false);
  });

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${task.id}`);
      setAppData(data);
      setLoading(false);
    };
    fetchListingData();
  }, [task.id]);

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

  const toggleTeamOption = (team: TeamType) => {
    setSelectedTeams((prevSelected) => {
      const newArray = [...prevSelected];
      if (newArray.find((ot) => ot.id === team.id)) {
        return newArray.filter((ot) => ot.id !== team.id);
      } else {
        newArray.push(team);
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
                  icon={faShareAlt}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => setShowShareSubmenu(true)}
                />
                {showShareSubmenu && (
                  <div
                    ref={shareRef}
                    className="absolute w-[320px] flex flex-col top-6 right-12 z-10"
                  >
                    <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
                    <div className="flex flex-col w-full bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-inner shadow-gray-700">
                      <h4 className="border-b border-borderprimary font-semibold p-2">
                        Share application
                      </h4>
                      <div className="flex flex-col gap-4 p-2">
                        <label className="font-semibold text-xs">
                          Team <span className="text-red-300">*</span>
                        </label>
                        <div className="relative" ref={teamsRef}>
                          {selectedTeams.length === 0 ? (
                            <input
                              className="border border-borderprimary rounded w-full py-2 px-3 text-primary cursor-pointer leading-tight"
                              type="text"
                              value={teamInput}
                              placeholder="Enter team name..."
                              onChange={(e) => {
                                setShowTeamList(true);
                                setTeamInput(e.target.value);
                              }}
                              onClick={() => setShowTeamList(!showTeamList)}
                              autoComplete="off"
                            />
                          ) : (
                            <div
                              className="border border-borderprimary rounded w-full py-2 px-3 text-secondary leading-tight 
                            focus-within:border focus-within:border-white"
                            >
                              <ul className="flex flex-wrap gap-1">
                                {selectedTeams.map((st: TeamType) => (
                                  <div
                                    className="flex w-fit py-1.5 px-2 bg-tertiary rounded-full items-center gap-2"
                                    key={st.id}
                                  >
                                    <img
                                      className="w-5 h-5 rounded-full"
                                      src={st.photo || st.avatar}
                                      alt={st.name}
                                    />
                                    <span className="text-xs">{st.name}</span>
                                    <FontAwesomeIcon
                                      size="xs"
                                      className="rounded-full text-primary cursor-pointer hover:bg-secondary p-1"
                                      icon={faX}
                                      onClick={() =>
                                        setSelectedTeams((prev) =>
                                          prev.filter((t) => st.id !== t.id)
                                        )
                                      }
                                    />
                                  </div>
                                ))}
                                <input
                                  className="focus:outline-none text-primary py-1"
                                  type="text"
                                  value={teamInput}
                                  placeholder="Enter more..."
                                  onChange={(e) => {
                                    setShowTeamList(true);
                                    setTeamInput(e.target.value);
                                  }}
                                  onClick={() => setShowTeamList(!showTeamList)}
                                  autoComplete="off"
                                />
                              </ul>
                            </div>
                          )}
                          {showTeamList && (
                            <div className="flex flex-col absolute w-full py-2 z-10 mt-2 bg-secondary border border-borderprimary rounded-sm text-sm">
                              <ul className="flex flex-col">
                                {displayedTeams.length > 0 && displayedTeams}
                                {displayedTeams.length === 0 && (
                                  <li className="p-2 text-tertiary text-xs hover:bg-tertiary">
                                    We couldn't find any results
                                    {teamInput && ` for "${teamInput}"`}.
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-center">
                          Teams you share to will be able to see all application
                          details and any added experiences.
                        </p>
                        <button className="w-fit self-end text-sm rounded-[4px] px-3 py-1 bg-buttonPrimary hover:bg-buttonSecondary">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                className="flex flex-col w-full p-1 mb-6 gap-4 sm:overflow-y-auto sm:w-1/2 sm:mb-0"
              >
                <div className="flex flex-col">
                  <h3 className="font-bold text-sm mb-1">Job Description</h3>
                  <div className="text-sm">{parse(appData.jobDescription)}</div>
                </div>
                <div className="flex flex-col">
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
                  <div className="flex flex-col gap-5 p-3">
                    <BoardDetail title="Company" data={appData.companyName} />
                    <BoardDetail title="Job title" data={appData.jobTitle} />
                    <BoardDetail title="Location" data={appData.location} />
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
                    <BoardDetail
                      title="Compensation"
                      data={formatSalary(
                        appData.salaryAmount,
                        appData.salaryFrequency
                      )}
                    />
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
              </div>
            </div>
          </>
        )}
      </div>
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
