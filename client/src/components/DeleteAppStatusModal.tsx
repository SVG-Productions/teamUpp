import React, { useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const DeleteAppStatusModal = ({
  handleModal,
  column,
  appData,
}: {
  handleModal: (bool: boolean) => void;
  column: any;
  appData: any;
}) => {
  const [allColumns, setAllColumns] = useState(appData.columns);
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-lg p-4 mx-auto z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="text-lg font-medium mb-4 text-center">
          <FontAwesomeIcon
            className="mr-4 text-red-600"
            icon={faExclamationTriangle}
          />
          Move apps from the{" "}
          <span className="capitalize">'{column.title}'</span> column
        </h2>
        <p className="text-sm text-tertiary">
          You're about to permanently delete this application status. This is
          irreversible. In order to preserve your applications, please select
          another status to move your applications to.
        </p>
        <div className="flex justify-between mt-6">
          <div className="flex flex-col">
            <p className="font-semibold text-tertiary">
              This status will be deleted:
            </p>
            <p className="self-center bg-highlightSecondary capitalize line-through rounded-md mt-2 p-1">
              {column.title}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-tertiary">
              Move existing applications to:
            </p>
            <div className="flex justify-between mt-2">
              <FontAwesomeIcon
                className="mr-4 self-center"
                size="xl"
                icon={faArrowRight}
              />
              <select></select>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteAppStatusModal;
