import { NavLink, useLoaderData } from "react-router-dom";
import { useState } from "react";
import SortByDropdown from "./SortByDropdown";
import FilterButton from "./FilterButton";
import FilterByInterests from "./FilterByInterests";
import FormField from "./FormField";
import sortTeams from "../utils/sortTeams";
import filterTeams from "../utils/filterTeams";

const AllTeams = () => {
  const { teams } = useLoaderData();
  const [searchTeam, setSearchTeam] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [filterBy, setFilterBy] = useState([]);

  const filteredTeams = filterTeams(teams, filterBy);
  const sortedTeams = sortTeams(filteredTeams, sortBy);

  return (
    <>
      <div className="flex flex-row w-full sm:w-1/2 sm:min-w-[340px]">
        <FormField
          id="search"
          label="SEARCH TEAMS"
          placeholder="Enter team name..."
          type="text"
          value={searchTeam}
          onChange={(e) => setSearchTeam(e.target.value)}
        />
        <button
          className="w-1/5 self-end min-w-[84px] text-sm bg-slate-900 hover:bg-blue-900 text-white 
              font-bold py-2 px-4 ml-3 mb-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
        >
          Search
        </button>
      </div>
      <div className="py-6 sm:w-[90%] sm:h-full ">
        <div className="flex flex-col">
          <div className="flex justify-between sm:flex sm:pr-2">
            <p className="font-bold text-slate-400 self-center">ALL TEAMS</p>
            <FilterButton />
            <FilterByInterests filterBy={filterBy} setFilterBy={setFilterBy} />
            <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <ul className={`flex flex-col overflow-auto p-2`}>
            {sortedTeams.map((team, index) => (
              <NavLink
                to={`/teams/${team.id}`}
                className="bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200 inline-block overflow-ellipsis overflow-hidden whitespace-nowrap"
                key={`${team.name}-${index}`}
              >
                <span className="font-semibold">{team.name} / </span>
                <span className="capitalize">{team.jobField}</span>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AllTeams;
