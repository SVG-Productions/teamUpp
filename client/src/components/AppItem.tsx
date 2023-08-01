import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import BoardAppDetailsModal from "./BoardAppDetailsModal";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  const [showAppModal, setShowAppModal] = useState(false);
  return (
    <>
      {showAppModal && (
        <BoardAppDetailsModal handleModal={setShowAppModal} task={task} />
      )}
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`p-2 mb-1 rounded-sm bg-primary ${
              snapshot.isDragging && "bg-tertiary"
            }`}
            onClick={() => setShowAppModal(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.companyName + " - " + task.jobTitle}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default AppItem;
