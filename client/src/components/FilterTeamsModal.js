import React, { useState } from "react";
import FilterButton from "./FilterButton";
import CloseButton from "./CloseButton";
import { useLoaderData } from "react-router-dom";

const FilterTeamsModal = ({
  handleFilterModal,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  isFilterModalShowing,
}) => {
  const { user } = useLoaderData();
  const { jobFields } = user;

  const [mobileSort, setMobileSort] = useState(sortBy);
  const [mobileFilter, setMobileFilter] = useState(filterBy);

  const sortValues = ["none", "name", "field"];

  const handleSelectFilter = (jf) => {
    if (mobileFilter.includes(jf.jobField)) {
      setMobileFilter((prev) => prev.filter((item) => item !== jf.jobField));
      return;
    }
    setMobileFilter((prev) => [...prev, jf.jobField]);
  };

  const handleApply = () => {
    setFilterBy(mobileFilter);
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
        className={`flex flex-col bg-white w-full h-fit rounded-t-xl p-4 z-10  ${
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
          <h3 className="font-bold text-slate-400">INTERESTS</h3>
          <ul className="flex flex-col p-2 pt-4 gap-3 capitalize">
            <li
              className={`${
                !mobileFilter.length ? "bg-highlightblue" : "bg-slate-100"
              }
           py-1 px-2 rounded-full w-fit cursor-pointer`}
              onClick={() => setMobileFilter([])}
            >
              All Fields
            </li>
            {jobFields.map((jf) => (
              <li
                key={jf.jobField}
                className={`${
                  mobileFilter.includes(jf.jobField)
                    ? "bg-highlightblue"
                    : "bg-slate-100"
                } py-1 px-2 rounded-full w-fit cursor-pointer`}
                onClick={() => handleSelectFilter(jf)}
              >
                {jf.jobField}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-slate-400">SORT BY</h3>
          <ul className="flex p-2 pt-4 gap-3 capitalize">
            {sortValues.map((value) => (
              <li
                key={value}
                className={`${
                  mobileSort === value ? "bg-highlightblue" : "bg-slate-100"
                } py-1 px-2 rounded-full w-fit cursor-pointer`}
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

export default FilterTeamsModal;
