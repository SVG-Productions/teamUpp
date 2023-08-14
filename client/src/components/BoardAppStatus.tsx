import React, { useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { useBoard } from "../context/BoardContext";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardAppStatus = ({
  appData,
  icon,
  iconColor,
}: {
  appData: any;
  icon: IconDefinition;
  iconColor: string;
}) => {
  const [showInput, setShowInput] = useState(false);
  const { boardData, setBoardData } = useBoard();
  const editRef = useRef(null);

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

  useOnClickOutside(editRef, () => setShowInput(false));

  return (
    <div className="flex items-center">
      <span className="text-sm w-2/5 py-1 font-semibold">Current Status</span>
      <div
        className="flex items-center justify-between w-3/5"
        ref={editRef}
        onClick={() => setShowInput(true)}
      >
        {showInput ? (
          <div className="flex flex-grow">
            <select
              className="capitalize w-full border border-borderprimary text-xs bg-primary rounded p-1 text-primary leading-tight focus:outline-bluegray"
              onChange={(e) => handleChangeStatus(e.target.value)}
              defaultValue={boardData.tasks[appData.id].statusId}
            >
              {boardData.columnOrder.map((id: any) => {
                return (
                  <option
                    className={`cursor-pointer ${
                      boardData.tasks[appData.id].statusId === id && ""
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
        ) : (
          <div className="flex text-xs items-center flex-grow py-1 px-2 rounded-sm truncate hover:bg-tertiary">
            <span className="capitalize">
              {boardData.tasks[appData.id].appStatus}
            </span>
          </div>
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
