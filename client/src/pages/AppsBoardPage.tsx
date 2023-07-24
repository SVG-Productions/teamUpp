import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AppsColumn from "../components/AppsColumn";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import { useRouteLoaderData } from "react-router-dom";
import { UserType } from "../../type-definitions";
import axios from "axios";

export const AppsBoardPage = () => {
  const { userData } = useRouteLoaderData("apps") as {
    userData: UserType;
  };
  const [appData, setAppData] = useState<any>(userData.applications.boardApps);

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
        const newColumnOrder = Array.from(appData.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...appData,
          columnOrder: newColumnOrder,
        };
        setAppData(newState);
        // make call to adjust index of columns
        await axios.patch("/api/app-statuses", { statusOrder: newColumnOrder });
        return;
      }

      const start = appData.columns[source.droppableId];
      const finish = appData.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newState = {
          ...appData,
          columns: {
            ...appData.columns,
            [newColumn.id]: newColumn,
          },
        };

        setAppData(newState);
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
        ...appData,
        columns: {
          ...appData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setAppData(newState);
    },
    [appData]
  );

  return (
    <div>
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
              {appData.columnOrder.map((columnId: string, index: number) => {
                const column: any = appData.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId: string) => appData.tasks[taskId]
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
    </div>
  );
};
