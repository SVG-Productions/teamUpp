import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const DeleteAppStatusModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-lg p-4 mx-auto z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-center">
          <FontAwesomeIcon
            className="mr-4 text-red-600"
            icon={faExclamationTriangle}
          />
          Move applications from the column.
        </h2>
        <p className="text-sm">
          You're about to permanently delete this application status. This is
          irreversible. In order to preserve your applications, please select
          another status to move your applications to.
        </p>
      </div>
    </ModalLayout>
  );
};

export default DeleteAppStatusModal;
