import React, { useState } from "react";
import FilterButton from "./FilterButton";
import CloseButton from "./CloseButton";

const FilterListingsModal = ({
  handleFilterModal,
  isFilterModalShowing,
  sortBy,
  setSortBy,
}) => {
  const [mobileSort, setMobileSort] = useState(sortBy);

  const sortValues = ["none", "company", "position", "date"];

  const handleApply = () => {
    setSortBy(mobileSort);
    handleFilterModal(false);
  };

  return (
    <div
      className={`flex items-end fixed inset-0 top-[124px] overflow-y-auto transition-all ${
        isFilterModalShowing ? "z-20" : "-z-20"
      } duration-500 sm:hidden`}
    >
      <div
        className={`fixed inset-0 top-[124px] bg-gray-500 bg-opacity-75 ${
          !isFilterModalShowing && "hidden"
        }`}
        onClick={() => handleFilterModal(false)}
      ></div>
      <div
        className={`flex flex-col bg-primary w-full h-fit rounded-t-xl p-4 z-10  ${
          isFilterModalShowing ? "translate-y-0" : "translate-y-[1000px]"
        } transition-all duration-500`}
      >
        <div className="flex w-full border-b-2 pb-4">
          <FilterButton />
          <h2 className="self-center text-lg font-medium">Filters</h2>
          <div className="ml-auto">
            <CloseButton onClick={() => handleFilterModal(false)} />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-slate-400">SORT BY</h3>
          <ul className="flex flex-col p-2 pt-4 gap-3 capitalize">
            {sortValues.map((value) => (
              <li
                key={value}
                className={`${
                  mobileSort === value ? "bg-highlightblue" : "bg-slate-100"
                } text-black py-1 px-2 rounded-full w-fit cursor-pointer`}
                onClick={() => setMobileSort(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="self-center w-1/2 min-w-[84px] text-sm bg-bluegray text-white
                font-bold py-2 px-4 mt-6 rounded-md"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterListingsModal;
