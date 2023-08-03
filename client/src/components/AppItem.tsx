import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import BoardAppDetailsModal from "./BoardAppDetailsModal";
import { useBoard } from "../context/BoardContext";

const AppItem = ({ task, index }: { task: any; index: number }) => {
  const { boardData, setBoardData } = useBoard();
  const [showAppModal, setShowAppModal] = useState(false);

  return (
    <>
      {showAppModal && (
        <BoardAppDetailsModal
          handleModal={setShowAppModal}
          task={task}
          boardData={boardData}
          setBoardData={setBoardData}
        />
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
