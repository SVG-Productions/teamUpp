import React from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";

const AppsColumn = ({ column, tasks }: { column: any; tasks: any }) => {
  return (
    <div className="m-2 border">
      <h3 className="p-2">{column.title}</h3>
      <StrictModeDroppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="p-2"
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
