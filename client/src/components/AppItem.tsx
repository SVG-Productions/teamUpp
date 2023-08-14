import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "../context/BoardContext";
import { formatGeneralDate } from "../utils/dateFormatters";

const AppItem = ({ app, index }: { app: any; index: number }) => {
  const { setShowAppDetails, setSelectedApp } = useBoard();
  return (
    <Draggable draggableId={app.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={`flex flex-col p-2 mb-1 rounded-sm bg-primary hover:bg-tertiary`}
          onClick={() => {
            setSelectedApp(app.id);
            setShowAppDetails(true);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col mb-2">
            <p className="text-sm font-semibold truncate">{app.jobTitle}</p>
            <p className="text-secondary text-xs"> {app.companyName}</p>
          </div>
          <p className="text-xs text-tertiary font-extralight self-end">
            Applied {formatGeneralDate(app.createdAt)}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default memo(AppItem);
