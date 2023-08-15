import React, { useState } from "react";
import ModalLayout from "../layouts/ModalLayout";

const RemoveApplicationModal = ({
  handleDelete,
  handleModal,
}: {
  handleDelete: () => void;
  handleModal: (bool: boolean) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-sm mx-auto p-4 z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-center">
          Remove access to this application?
        </h2>
        <p className="text-sm">
          You're about to remove this application from the team. Comments posted
          will be lost permanently.
        </p>
        <div className="flex justify-center mt-6 gap-3">
          <button
            className="w-1/3 text-center min-w-[84px] text-sm bg-red-400 hover:bg-red-500 text-white 
          font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
            onClick={() => {
              setIsDeleting(true);
              handleDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Removing.." : "Remove"}
          </button>
          <button
            className="w-1/3 min-w-[84px] text-sm text-center bg-primary hover:bg-highlight border-2 
          text-primary font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
            onClick={() => handleModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RemoveApplicationModal;
