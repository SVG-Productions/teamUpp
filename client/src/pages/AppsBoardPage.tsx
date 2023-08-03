import React, { FormEvent, useCallback, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AppsColumn from "../components/AppsColumn";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useBoard } from "../context/BoardContext";

export const AppsBoardPage = () => {
  const { boardData, setBoardData } = useBoard();
  const [appStatus, setAppStatus] = useState<string>("");
  const [showAddStatus, setShowAddStatus] = useState<boolean>(false);
  const statusRef = useRef<HTMLFormElement>(null);

  const handleCloseAddStatus = () => {
    setShowAddStatus(false);
    setAppStatus("");
  };
  useOnClickOutside(statusRef, handleCloseAddStatus);

  const handleAddStatus = async (e: FormEvent) => {
    e.preventDefault();
    if (!appStatus) {
      handleCloseAddStatus();
      return;
    }
    try {
      const { data } = await axios.post("/api/app-statuses", {
        newStatus: { appStatus, index: boardData.columnOrder.length },
      });

      setBoardData((prev: any) => ({
        ...prev,
        columnOrder: [...prev.columnOrder, data.addedStatus.id],
        columns: {
          ...prev.columns,
          [data.addedStatus.id]: {
            id: data.addedStatus.id,
            title: appStatus,
            taskIds: [],
          },
        },
      }));
      handleCloseAddStatus();
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
      handleCloseAddStatus();
    }
  };

  const onDragEnd = useCallback(
    async (result: any) => {
      const { destination, source, draggableId, type } = result;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      if (type === "column") {
        const newColumnOrder = Array.from(boardData.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...boardData,
          columnOrder: newColumnOrder,
        };
        setBoardData(newState);
        await axios.patch("/api/app-statuses/status-order", {
          statusOrder: newColumnOrder,
        });
        return;
      }

      const start = boardData.columns[source.droppableId];
      const finish = boardData.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newState = {
          ...boardData,
          columns: {
            ...boardData.columns,
            [newColumn.id]: newColumn,
          },
        };

        const applicationOrders = [];
        for (const [index, taskId] of newTaskIds.entries()) {
          applicationOrders.push(
            axios.patch(`/api/listings/${taskId}`, {
              index,
            })
          );
        }

        try {
          setBoardData(newState);
          await Promise.all(applicationOrders);
        } catch (error) {
          toast.error(
            "Error updating application order. Refresh and try again.",
            basicToast
          );
          return;
        }

        return;
      }
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
        tasks: {
          ...boardData.tasks,
          [draggableId]: {
            ...boardData.tasks[draggableId],
            statusId: newFinish.id,
          },
        },
      };
      const applicationOrders = [];
      for (const [index, taskId] of startTaskIds.entries()) {
        applicationOrders.push(
          axios.patch(`/api/listings/${taskId}`, {
            index,
          })
        );
      }
      for (const [index, taskId] of finishTaskIds.entries()) {
        applicationOrders.push(
          axios.patch(`/api/listings/${taskId}`, {
            index,
            statusId: newFinish.id,
          })
        );
      }
      try {
        setBoardData(newState);
        await Promise.all(applicationOrders);
      } catch (error) {
        toast.error(
          "Error updating applications. Refresh and try again.",
          basicToast
        );
      }
    },
    [boardData]
  );

  return (
    <div className="flex">
      <DragDropContext
        //   onDragStart={}
        //   onDragUpdate={}
        onDragEnd={onDragEnd}
      >
        <StrictModeDroppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardData.columnOrder.map((columnId: string, index: number) => {
                const column: any = boardData.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId: string) => boardData.tasks[taskId]
                );

                return (
                  <AppsColumn
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {!showAddStatus ? (
        <FontAwesomeIcon
          className="m-2 px-1.5 py-1 bg-secondary rounded-md cursor-pointer hover:bg-highlightSecondary"
          onClick={() => setShowAddStatus(true)}
          icon={faPlus}
          size="xl"
        />
      ) : (
        <div className="flex flex-col m-2 p-1 bg-secondary rounded-md w-[220px]">
          <form
            ref={statusRef}
            className="max-h-fit"
            onSubmit={handleAddStatus}
          >
            <input
              className="border border-borderprimary rounded py-2 px-3 mb-2 text-primary leading-tight focus:outline-bluegray"
              id="app-status"
              type="text"
              autoFocus
              value={appStatus}
              onChange={(e) => setAppStatus(e.target.value)}
              autoComplete="off"
            />
            <div className="flex justify-end gap-2">
              <FontAwesomeIcon
                className="bg-tertiary py-1 px-1.5 rounded cursor-pointer hover:bg-highlightSecondary"
                onClick={handleCloseAddStatus}
                icon={faX}
              />
              <button>
                <FontAwesomeIcon
                  className="bg-tertiary p-1 rounded cursor-pointer hover:bg-highlightSecondary"
                  icon={faCheck}
                />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
