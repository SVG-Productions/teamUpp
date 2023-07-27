import React from "react";
import ModalLayout from "../layouts/ModalLayout";

const DeleteAppStatusModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 z-30 top-[64px] overflow-y-auto">
      <div className="flex items-center w-full justify-center h-full">
        <div
          className="sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75 z-40"
          onClick={() => handleModal(false)}
        ></div>
        <div className="fixed bg-primary inset-0 top-[64px] sm:hidden"></div>
        <p>Delete</p>
      </div>
    </div>
  );
};

export default DeleteAppStatusModal;
