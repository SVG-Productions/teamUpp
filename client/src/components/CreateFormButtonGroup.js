import React from "react";

const CreateFormButtonGroup = ({ handleCancel }) => {
  return (
    <>
      <button
        className="w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
  font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
      >
        Create
      </button>
      <div
        className="w-1/3 min-w-[84px] text-sm text-center bg-white hover:bg-gray-300 cursor-pointer border-2 
  text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
        onClick={handleCancel}
      >
        Cancel
      </div>
    </>
  );
};

export default CreateFormButtonGroup;
