import React from "react";
import ModalLayout from "../layouts/ModalLayout";

const BoardAppDetailsModal = ({
  handleModal,
  task,
}: {
  handleModal: (bool: boolean) => void;
  task: any;
}) => {
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-lg p-5 mx-auto z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="sm:text-lg font-medium mb-8 sm:mb-4 text-center">
          {task.companyName} - {task.jobTitle}
        </h2>
      </div>
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
