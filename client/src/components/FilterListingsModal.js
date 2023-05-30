import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

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
        <div className="flex w-full border-b-2 pb-4 items-center">
          <FontAwesomeIcon icon={faArrowDownWideShort} size="xl" />
          <h2 className="self-center ml-2 text-lg font-medium">Filters</h2>
          <div className="ml-auto">
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              className="cursor-pointer text-slate-900 hover:text-slate-500"
              onClick={() => handleFilterModal(false)}
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-headingColor">SORT BY</h3>
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
