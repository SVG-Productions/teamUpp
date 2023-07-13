import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AppsColumn from "../components/AppsColumn";
import { StrictModeDroppable } from "../components/StrictModeDroppable";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Applied",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "1st Interview",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "2nd Interview",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Archived",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};
const AppsBoardPage = () => {
  const [appData, setAppData] = useState<any>(initialData);

  const onDragEnd = useCallback(
    (result: any) => {
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
        console.log(appData);
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
      console.log(appData);
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

export default AppsBoardPage;
