import React, { useState, useRef, FormEvent } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { useBoard } from "../context/BoardContext";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardAppStatus = ({
  title,
  value,
  appId,
  statusId,
  setAppData,
  icon,
  iconColor,
}: {
  title: string;
  value: string;
  appId: string;
  statusId: string;
  setAppData: any;
  icon: IconDefinition;
  iconColor: string;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [appStatus, setAppStatus] = useState(value);
  const { boardData, setBoardData } = useBoard();
  const editRef = useRef(null);

  const handleChangeStatus = async (statusId: any) => {
    const { title, taskIds } = boardData.columns[statusId];
    const oldStatusId = boardData.tasks[appId].statusId;

    setBoardData((prev: any) => {
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [appId]: {
            ...prev.tasks[appId],
            statusId,
            appStatus: title,
            index: taskIds.length,
          },
        },
        columns: {
          ...prev.columns,
          [statusId]: {
            ...prev.columns[statusId],
            taskIds: [...taskIds, appId],
          },
          [oldStatusId]: {
            ...prev.columns[oldStatusId],
            taskIds: prev.columns[oldStatusId].taskIds.filter(
              (id: any) => id !== appId
            ),
          },
        },
      };
    });
    try {
      await axios.patch(`/api/listings/${appId}`, {
        statusId,
        index: taskIds.length,
      });
      setAppStatus(boardData.columns[statusId].title);
    } catch (error) {
      toast.error(
        "Error updating applications. Refresh and try again.",
        basicToast
      );
    }
  };

  const handleAcceptEdit = async () => {
    if (value === appStatus) {
      setShowInput(false);
      return;
    }
    try {
      setAppData((prev: any) => ({
        ...prev,
        ["appStatus"]: appStatus,
      }));
      setShowInput(false);
    } catch (error) {
      toast.error("Error updating application.", basicToast);
    }
  };

  const handleAcceptEditSubmission = async (e: FormEvent) => {
    e.preventDefault();
    await handleAcceptEdit();
  };

  useOnClickOutside(editRef, handleAcceptEdit);

  const displayedValue = (
    <div className="flex text-xs items-center flex-grow py-1 px-2 rounded-sm truncate hover:bg-tertiary">
      <span className="capitalize">{appStatus}</span>
    </div>
  );
  return (
    <div className="flex items-center">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      <div
        className="flex items-center justify-between w-3/5"
        ref={editRef}
        onClick={() => setShowInput(true)}
      >
        {showInput ? (
          <form
            onSubmit={handleAcceptEditSubmission}
            className="flex flex-grow"
          >
            <select
              className="capitalize w-full border border-borderprimary text-xs bg-primary rounded p-1 text-primary leading-tight focus:outline-bluegray"
              onChange={(e) => handleChangeStatus(e.target.value)}
              defaultValue={statusId}
            >
              {boardData.columnOrder.map((id: any) => {
                return (
                  <option
                    className={`cursor-pointer ${
                      boardData.tasks[appId].statusId === id && ""
                    }`}
                    value={id}
                    key={id}
                  >
                    {boardData.columns[id].title}
                  </option>
                );
              })}
            </select>
          </form>
        ) : (
          displayedValue
        )}
        <button
          onClick={() => setShowInput(true)}
          className="w-6 h-6 ml-2 rounded-full hover:bg-highlight"
        >
          <FontAwesomeIcon icon={icon} className={iconColor} />
        </button>
      </div>
    </div>
  );
};

export default BoardAppStatus;
