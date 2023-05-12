import React from "react";
import { useLoaderData } from "react-router-dom";

const FilterByInterests = ({ filterBy, setFilterBy }) => {
  const { user } = useLoaderData();
  const { jobFields } = user;
  return (
    <div className="hidden sm:flex">
      {/* <p
        className="font-bold self-center text-slate-400 
        sm:text-sm lg:text-base"
      >
        FILTER BY:
      </p> */}
      <ul className="flex text-xs items-center gap-4 capitalize">
        {jobFields.map((jf) => (
          <li
            key={jf.jobField}
            className="bg-slate-100 py-1 px-2 rounded-full w-fit 
            hover:bg-highlightblue hover:cursor-pointer"
          >
            {jf.jobField}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByInterests;
