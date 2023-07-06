import React from "react";
import { Draggable } from "react-beautiful-dnd";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  console.log(task.id, index);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="p-2 mb-2 border"
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
