import React from "react";

const FilterTeamsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto sm:hidden">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-white transition-opacity"></div>

        <div className="relative bg-white w-full max-w-sm mx-auto rounded-sm z-10 sm:shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-center">Filter</h2>
            <p className="text-sm">Filtering Stuff</p>
            <div className="flex justify-center mt-6 gap-3">
              <button
                className="w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
              font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
                onClick={() => onClose(false)}
              >
                Apply
              </button>
              <button
                className="w-1/3 min-w-[84px] text-sm text-center bg-white hover:bg-gray-300 border-2 
          text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
                onClick={() => onClose(false)}
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

export default FilterTeamsModal;
