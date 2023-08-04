import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "../context/BoardContext";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  const { setShowAppDetails, setSelectedApp } = useBoard();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`p-2 mb-1 rounded-sm bg-primary ${
            snapshot.isDragging && "bg-tertiary"
          }`}
          onClick={() => {
            setSelectedApp(task.id);
            setShowAppDetails(true);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.companyName + " - " + task.jobTitle}
        </div>
      )}
    </Draggable>
  );
};

export default memo(AppItem);
