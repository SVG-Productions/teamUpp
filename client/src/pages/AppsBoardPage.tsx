import React, { useCallback, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import AppsColumn from "../components/AppsColumn";
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
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1"],
};
const AppsBoardPage = () => {
  const [appData, setAppData] = useState<any>(initialData);
  const onDragEnd = useCallback(
    (result: any) => {
      const { destination, source, draggableId } = result;
      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      const column = appData.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
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
        {appData.columnOrder.map((columnId: string) => {
          const column: any = appData.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: string) => appData.tasks[taskId]
          );

          return <AppsColumn key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default AppsBoardPage;
