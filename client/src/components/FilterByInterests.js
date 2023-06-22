import React from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

const FilterByInterests = () => {
  const { userData } = useLoaderData();
  const { jobFields } = userData;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectFilter = (jf) => {
    if (searchParams.getAll("jobField").includes(jf)) {
      setSearchParams({
        jobField: searchParams.getAll("jobField").filter((item) => item !== jf),
        page: 1,
      });
      return;
    }
    setSearchParams({
      jobField: [...searchParams.getAll("jobField"), jf],
      page: 1,
    });
  };

  const handleClearFilter = () => {
    setSearchParams({ page: 1 });
  };

  return (
    <div className="flex pt-4">
      <ul className="flex flex-wrap text-xs gap-2 capitalize text-headingColor">
        <li
          className={`${
            !searchParams.getAll("jobField").length
              ? "bg-highlightSecondary"
              : "bg-secondary"
          }
           p-2 rounded-full hover:bg-highlightSecondary hover:cursor-pointer`}
          onClick={handleClearFilter}
        >
          All Fields
        </li>
        {jobFields.map((jf) => (
          <li
            key={jf}
            className={`${
              searchParams.getAll("jobField").includes(jf)
                ? "bg-highlightSecondary"
                : "bg-secondary"
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
