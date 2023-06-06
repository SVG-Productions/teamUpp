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
    <div className="flex pt-4">
      <ul className="flex flex-wrap text-xs gap-2 capitalize text-headingColor">
        <li
          className={`${
            !filterBy.length ? "bg-highlightSecondary" : "bg-secondary"
          }
           p-2 rounded-full hover:bg-highlightSecondary hover:cursor-pointer`}
          onClick={() => setFilterBy([])}
        >
          All Fields
        </li>
        {jobFields.map((jf) => (
          <li
            key={jf}
            className={`${
              filterBy.includes(jf) ? "bg-highlightSecondary" : "bg-secondary"
            } p-2 rounded-full hover:bg-highlightSecondary hover:cursor-pointer`}
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
