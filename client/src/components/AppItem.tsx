import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "../context/BoardContext";
import { formatGeneralDate } from "../utils/dateFormatters";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  const { setShowAppDetails, setSelectedApp } = useBoard();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`flex flex-col p-2 mb-1 rounded-sm bg-primary ${
            snapshot.isDragging && "bg-tertiary"
          }`}
          onClick={() => {
            setSelectedApp(task.id);
            setShowAppDetails(true);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col mb-2">
            <p className="text-sm font-semibold truncate">{task.jobTitle}</p>
            <p className="text-secondary text-xs"> {task.companyName}</p>
          </div>
          <p className="text-xs text-tertiary font-extralight self-end">
            Applied {formatGeneralDate(task.createdAt)}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default memo(AppItem);
