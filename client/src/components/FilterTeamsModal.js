import React from "react";
import FilterButton from "./FilterButton";
import CloseButton from "./CloseButton";

const FilterTeamsModal = ({
  handleModal,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
}) => {
  return (
    <div className="flex items-end fixed inset-0 top-[124px] z-20 overflow-y-auto sm:hidden">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => handleModal(false)}
      ></div>
      <div className="flex flex-col bg-white w-full h-[70%] rounded-t-xl p-4 z-10">
        <div className="flex w-full">
          <FilterButton />
          <h2 className="self-center text-lg font-medium">Filter</h2>
          <div className="ml-auto">
            <CloseButton onClick={() => handleModal(false)} />
          </div>
        </div>
        <button
          className="self-center w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white
                font-bold py-2 px-4 mt-6 rounded-md focus:shadow-outline"
          onClick={() => handleModal(false)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterTeamsModal;
