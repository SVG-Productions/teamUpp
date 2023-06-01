import React from "react";

const CreateFormButtonGroup = ({ handleCancel }) => {
  return (
    <>
      <button
        className="w-1/3 min-w-[84px] text-sm bg-buttonPrimary hover:bg-buttonSecondary text-white 
  font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
      >
        Create
      </button>
      <div
        className="w-1/3 min-w-[84px] text-sm text-center hover:bg-highlight cursor-pointer border-2 
  text-primary font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
        onClick={handleCancel}
      >
        Cancel
      </div>
    </>
  );
};

export default CreateFormButtonGroup;
