import React from "react";
import { useLoaderData } from "react-router-dom";

const FilterByInterests = ({ filterBy, setFilterBy }) => {
  const { userData } = useLoaderData();
  const { jobFields } = userData;

  const handleSelectFilter = (jf) => {
    if (filterBy.includes(jf)) {
      setFilterBy((prev) => prev.filter((item) => item !== jf));
      return;
    }
    setFilterBy((prev) => [...prev, jf]);
  };

  return (
    <div className="hidden sm:flex">
      <ul className="flex text-xs items-center gap-2 capitalize">
        <li
          className={`${!filterBy.length ? "bg-highlightblue" : "bg-slate-100"}
           py-1 px-2 rounded-full w-fit hover:bg-highlightblue hover:cursor-pointer`}
          onClick={() => setFilterBy([])}
        >
          All Fields
        </li>
        {jobFields.map((jf) => (
          <li
            key={jf}
            className={`${
              filterBy.includes(jf) ? "bg-highlightblue" : "bg-slate-100"
            } py-1 px-2 rounded-full w-fit hover:bg-highlightblue hover:cursor-pointer
            truncate`}
            onClick={() => handleSelectFilter(jf)}
          >
            {jf}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByInterests;
