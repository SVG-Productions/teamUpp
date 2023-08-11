import React, { useState, useRef, FormEvent } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { useBoard } from "../context/BoardContext";

const BoardAppStatus = ({
  title,
  value,
  appId,
  statusId,
  setAppData,
}: {
  title: string;
  value: string;
  appId: string;
  statusId: string;
  setAppData: any;
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
    <div className="flex text-xs items-center w-full py-1 px-2 rounded-sm truncate hover:bg-tertiary">
      <span className="capitalize">{appStatus}</span>
    </div>
  );
  return (
    <div className="flex items-center">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      <div className="w-3/5" ref={editRef} onClick={() => setShowInput(true)}>
        {showInput ? (
          <form onSubmit={handleAcceptEditSubmission} className="flex gap-1">
            <select
              className="flex capitalize text-sm rounded-[4px] ml-1.5 px-1 py-0.5 bg-buttonPrimary focus:border-0"
              onChange={(e) => handleChangeStatus(e.target.value)}
              defaultValue={statusId}
            >
              {boardData.columnOrder.map((id: any) => {
                return (
                  <option
                    className={`cursor-pointer ${
                      boardData.tasks[appId].statusId === id && "hidden"
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
      </div>
    </div>
  );
};

export default BoardAppStatus;
