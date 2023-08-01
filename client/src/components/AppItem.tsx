import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ModalLayout from "../layouts/ModalLayout";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  const [showAppModal, setShowAppModal] = useState(false);
  console.log(task);
  return (
    <>
      {showAppModal && (
        <ModalLayout handleClickOut={setShowAppModal}>
          <div className="bg-primary w-full max-w-lg p-5 mx-auto z-10 sm:rounded-md sm:shadow-lg">
            <h2 className="sm:text-lg font-medium mb-8 sm:mb-4 text-center">
              {task.companyName} - {task.jobTitle}
            </h2>
          </div>
        </ModalLayout>
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
