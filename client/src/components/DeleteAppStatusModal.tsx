import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const DeleteAppStatusModal = ({
  handleModal,
  column,
}: {
  handleModal: (bool: boolean) => void;
  column: any;
}) => {
  console.log(column);
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-lg p-4 mx-auto z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-center">
          <FontAwesomeIcon
            className="mr-4 text-red-600"
            icon={faExclamationTriangle}
          />
          Move applications from the column
        </h2>
        <p className="text-sm text-tertiary">
          You're about to permanently delete this application status. This is
          irreversible. In order to preserve your applications, please select
          another status to move your applications to.
        </p>
        <div className="flex justify-between mt-6">
          <div className="flex flex-col">
            <p className="font-semibold text-secondary">
              This status will be deleted:
            </p>
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <p className="font-semibold text-secondary">
                Move existing applications to:
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteAppStatusModal;
