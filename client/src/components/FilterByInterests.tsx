import React from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { UserType } from "../../type-definitions";

const FilterByInterests = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const { jobFields } = userData;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectFilter = (jf: string) => {
    if (searchParams.getAll("jobField").includes(jf)) {
      setSearchParams((prev) => {
        const arr: string[] = [];
        searchParams.forEach((v, k) => {
          if (k === "jobField" && v !== jf) {
            arr.push(v);
          }
        });
        searchParams.delete("jobField");
        arr.forEach((f) => {
          searchParams.append("jobField", f);
        });
        searchParams.set("page", "1");

        return prev;
      });
    } else {
      setSearchParams((prev) => {
        searchParams.append("jobField", jf);
        searchParams.set("page", "1");

        return prev;
      });
    }
  };

  const handleClearFilter = () => {
    setSearchParams((prev) => {
      searchParams.delete("jobField");
      searchParams.set("page", "1");
      return prev;
    });
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
        {jobFields.map((jf: string) => (
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
