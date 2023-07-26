import React from "react";
import AppItem from "./AppItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faEllipsisH,
  faEllipsisVertical,
  faGripLines,
  faGripVertical,
  faHandDots,
  faListDots,
} from "@fortawesome/free-solid-svg-icons";

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
          className="flex flex-col m-2 bg-secondary rounded-md w-[240px]"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-start p-2 items-center">
            <div {...provided.dragHandleProps}>
              <FontAwesomeIcon
                size="lg"
                icon={faGripLines}
                className="pr-2 text-tertiary hover:text-primary"
              />
            </div>
            <h3 className="capitalize text-sm text-primary font-bold cursor-pointer">
              {column.title}
            </h3>
            {column.id !== "applied" && (
              <FontAwesomeIcon
                size="lg"
                icon={faEllipsis}
                className="pr-1 ml-auto text-tertiary cursor-pointer hover:text-primary"
              />
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
