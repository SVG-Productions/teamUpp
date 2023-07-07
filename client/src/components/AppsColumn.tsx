import React from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";

const AppsColumn = ({ column, tasks }: { column: any; tasks: any }) => {
  return (
    <div className="flex flex-col m-2 border w-[220px]">
      <h3 className="p-2">{column.title}</h3>
      <StrictModeDroppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`flex-grow min-h-[10px] p-2 bg-primary ${
              snapshot.isDraggingOver && "bg-secondary"
            }`}
            {...provided.droppableProps}
          >
            {tasks.map((task: any, index: number) => (
              <AppItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default AppsColumn;
