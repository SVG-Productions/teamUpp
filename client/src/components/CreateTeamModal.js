import React from "react";

const CreateTeamModal = ({ handleCreateModal }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity"
          onClick={() => handleCreateModal(false)}
        ></div>
        <div className="fixed inset-0 bg-white sm:hidden"></div>

        <div className="relative bg-white w-full max-w-sm mx-auto rounded-sm z-10 sm:shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-center">
              Delete your account?
            </h2>
            <p className="text-sm">
              You're about to permanently delete this account and all of its
              data. This is irreversible.
            </p>
            <div className="flex justify-center mt-6 gap-3">
              <button
                className="w-1/3 min-w-[84px] text-sm bg-red-400 hover:bg-red-500 text-white 
          font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
              >
                Create
              </button>
              <button
                className="w-1/3 min-w-[84px] text-sm text-center bg-white hover:bg-gray-300 border-2 
          text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
                onClick={() => handleCreateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;
