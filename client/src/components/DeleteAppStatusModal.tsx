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
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-lg p-5 mx-auto z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="sm:text-lg font-medium mb-8 sm:mb-4 text-center">
          <FontAwesomeIcon
            className="mr-4 text-red-600"
            icon={faExclamationTriangle}
          />
          Move apps from the{" "}
          <span className="capitalize">'{column.title}'</span> column
        </h2>
        <p className="text-center text-sm text-tertiary">
          You're about to permanently delete this application status. This is
          irreversible. In order to preserve your applications, please select
          another status to move your applications to.
        </p>
        <div className="flex justify-between mt-6">
          <div className="flex flex-col">
            <p className="text-center text-sm font-semibold text-tertiary">
              This status will be deleted:
            </p>
            <p className="self-center bg-red-500 capitalize font-semibold line-through rounded-sm mt-2 p-1">
              {column.title}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-center text-sm font-semibold text-tertiary">
              Move existing applications to:
            </p>
            <div className="flex justify-between mt-2">
              <FontAwesomeIcon
                className="mr-4 self-center"
                size="xl"
                icon={faArrowRight}
              />
              <select
                className="w-full rounded-sm border border-borderprimary 
              focus:border-whitecursor-pointer capitalize p-1 bg-highlightSecondary"
              >
                {Object.entries(appData.columns).map(
                  ([key, value]: [any, any]) => {
                    if (key === column.id) {
                      return null;
                    }
                    return (
                      <option className="cursor-pointer" key={value.id}>
                        {value.title}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end mt-8 gap-3">
          <button
            className="text-center min-w-[60px] text-sm bg-red-500 hover:bg-red-400 text-white 
              font-semibold py-1 px-2 rounded-sm focus:shadow-outline sm:text-base"
          >
            Delete
          </button>
          <button
            className="min-w-[60px] text-sm text-center bg-primary hover:bg-highlight border border-gray-500 
              text-primary font-semibold py-1 px-2 rounded-sm focus:shadow-outline sm:text-base"
            onClick={() => handleModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteAppStatusModal;
