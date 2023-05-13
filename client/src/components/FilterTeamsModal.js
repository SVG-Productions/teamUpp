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
    <div className="flex items-end top-[124px] justify-center min-h-screen fixed inset-0 z-20 overflow-y-auto sm:hidden">
      <div
        className="fixed inset-0 top-[124px] bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => handleModal(false)}
      ></div>

      <div className="relative bg-white w-full h-3/4 rounded-t-xl z-10 sm:shadow-lg">
        <div className="p-4">
          <div className="flex w-full">
            <FilterButton />
            <h2 className="self-center text-lg font-medium">Filter</h2>
            <div className="ml-auto">
              <CloseButton onClick={() => handleModal(false)} />
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-3">
            <button
              className="w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white
                font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
              onClick={() => handleModal(false)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTeamsModal;
