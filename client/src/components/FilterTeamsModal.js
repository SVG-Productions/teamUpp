import React from "react";
import FilterButton from "./FilterButton";
import CloseButton from "./CloseButton";
import { useLoaderData } from "react-router-dom";

const FilterTeamsModal = ({
  handleModal,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  isFilterModalShowing,
}) => {
  const { user } = useLoaderData();
  const { jobFields } = user;
  const sortValues = ["none", "name", "field"];

  const handleSelectFilter = (jf) => {
    if (filterBy.includes(jf.jobField)) {
      setFilterBy((prev) => prev.filter((item) => item !== jf.jobField));
      return;
    }
    setFilterBy((prev) => [...prev, jf.jobField]);
  };

  const handleSortBy = (value) => {
    setSortBy(value);
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
        onClick={() => handleModal(false)}
      ></div>
      <div
        className={`flex flex-col bg-white w-full h-[70%] rounded-t-xl p-4 z-10  ${
          isFilterModalShowing ? "translate-y-0" : "translate-y-[1000px]"
        } transition-all duration-500`}
      >
        <div className="flex w-full">
          <FilterButton />
          <h2 className="self-center text-lg font-medium">Filter</h2>
          <div className="ml-auto">
            <CloseButton onClick={() => handleModal(false)} />
          </div>
        </div>
        <div>
          <h3>Sort</h3>
          <ul className="flex text-sm gap-2 capitalize">
            {sortValues.map((value) => (
              <li
                key={value}
                className={`${
                  filterBy.includes(value) ? "bg-highlightblue" : "bg-slate-100"
                } py-1 px-2 rounded-full w-fit`}
                onClick={() => handleSortBy(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Filter</h3>
          <ul className="flex flex-col text-sm gap-2 capitalize">
            <li
              className={`${
                !filterBy.length ? "bg-highlightblue" : "bg-slate-100"
              }
           py-1 px-2 rounded-full w-fit`}
              onClick={() => setFilterBy([])}
            >
              All Fields
            </li>
            {jobFields.map((jf) => (
              <li
                key={jf.jobField}
                className={`${
                  filterBy.includes(jf.jobField)
                    ? "bg-highlightblue"
                    : "bg-slate-100"
                } py-1 px-2 rounded-full w-fit`}
                onClick={() => handleSelectFilter(jf)}
              >
                {jf.jobField}
              </li>
            ))}
          </ul>
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
