import React from "react";
import { Draggable } from "react-beautiful-dnd";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  console.log(task.id, index);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`p-2 mb-2 border bg-secondary ${
            snapshot.isDragging && "bg-tertiary"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default AppItem;
