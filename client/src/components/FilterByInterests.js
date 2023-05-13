import React from "react";
import { useLoaderData } from "react-router-dom";

const FilterByInterests = ({ filterBy, setFilterBy }) => {
  const { user } = useLoaderData();
  const { jobFields } = user;

  const handleSelectFilter = (jf) => {
    if (filterBy.includes(jf.jobField)) {
      setFilterBy((prev) => prev.filter((item) => item !== jf.jobField));
      return;
    }
    setFilterBy((prev) => [...prev, jf.jobField]);
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
            key={jf.jobField}
            className={`${
              filterBy.includes(jf.jobField)
                ? "bg-highlightblue"
                : "bg-slate-100"
            } py-1 px-2 rounded-full w-fit hover:bg-highlightblue hover:cursor-pointer`}
            onClick={() => handleSelectFilter(jf)}
          >
            {jf.jobField}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByInterests;
