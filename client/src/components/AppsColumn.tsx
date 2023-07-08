import React from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";

const AppsColumn = ({
  column,
  tasks,
  index,
}: {
  column: any;
  tasks: any;
  index: number;
}) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="flex flex-col m-2 border bg-primary w-[220px]"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="p-2" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <StrictModeDroppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`flex-grow min-h-[10px] p-2 ${
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
      )}
    </Draggable>
  );
};

export default AppsColumn;
