import React, { useRef, useState } from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useOnClickOutside from "../hooks/useOnClickOutside";
import FormField from "./FormField";

const AppsColumn = ({
  column,
  tasks,
  index,
}: {
  column: any;
  tasks: any;
  index: number;
}) => {
  const [status, setStatus] = useState("");
  const [showStatusEdit, setShowStatusEdit] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(editRef, () => setShowStatusEdit(false));

  const handleEditClick = () => {
    setShowStatusEdit(true);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="flex flex-col m-2 bg-secondary rounded-md w-[240px]"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-start p-2 items-center">
            {showStatusEdit ? (
              <input
                className="border border-borderprimary w-full p-1 rounded text-primary leading-tight focus:outline-bluegray"
                id="app-status"
                type="text"
                autoFocus
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                autoComplete="off"
              />
            ) : (
              <>
                <div className="w-full" {...provided.dragHandleProps}>
                  <h3
                    onClick={handleEditClick}
                    className="capitalize text-sm text-primary font-bold cursor-pointer"
                  >
                    {column.title}
                  </h3>
                </div>
                {column.id !== "applied" && (
                  <FontAwesomeIcon
                    size="lg"
                    icon={faEllipsis}
                    className="pr-1 ml-auto text-tertiary cursor-pointer hover:text-primary"
                  />
                )}
              </>
            )}
          </div>
          <StrictModeDroppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="flex-grow min-h-[10px] p-2"
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
