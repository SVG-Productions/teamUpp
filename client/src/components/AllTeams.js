import { NavLink, useLoaderData } from "react-router-dom";
import { useState } from "react";
import SortByDropdown from "./SortByDropdown";
import FilterButton from "./FilterButton";
import FilterByInterests from "./FilterByInterests";
import sortTeams from "../utils/sortTeams";
import filterTeams from "../utils/filterTeams";
import FilterTeamsModal from "./FilterTeamsModal";
import NullInfo from "./NullInfo";
import SearchInput from "./SearchInput";

const AllTeams = ({ isFilterModalShowing, handleFilterModal }) => {
  const { teams } = useLoaderData();

  const [searchTeam, setSearchTeam] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [filterBy, setFilterBy] = useState([]);

  const sortValues = ["none", "name", "field"];
  const filteredTeams = filterTeams(teams, filterBy);
  const sortedTeams = sortTeams(filteredTeams, sortBy);

  return (
    <>
      <FilterTeamsModal
        isFilterModalShowing={isFilterModalShowing}
        handleFilterModal={handleFilterModal}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <div className="flex justify-between">
        <h1 className="font-bold text-slate-400 text-lg sm:text-xl sm:pl-2">
          ALL TEAMS
        </h1>
        <FilterButton handleFilterModal={handleFilterModal} />
      </div>
      <div className="flex w-full align-middle py-4 sm:w-1/2 sm:min-w-[440px] sm:p-4 sm:pb-0">
        <div className="flex gap-2 w-full">
          <SearchInput
            placeholder="Search teams..."
            searchValue={searchTeam}
            handleChange={setSearchTeam}
          />
        </div>
      </div>
      <div className=" sm:w-full transtion-all duration-500 overflow-hidden">
        <div className="flex flex-col">
          <div className="flex justify-between gap-2 sm:flex sm:flex-wrap sm:justify-between sm:p-4 sm:pr-0 md:w-[90%] lg:w-4/5">
            <FilterByInterests filterBy={filterBy} setFilterBy={setFilterBy} />
            <SortByDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortValues={sortValues}
            />
          </div>
          <ul className="flex flex-col overflow-auto p-2 md:w-[90%] lg:w-4/5">
            {sortedTeams.length ? (
              sortedTeams.map((team, index) => (
                <NavLink
                  to={`/teams/${team.id}`}
                  className="bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200 inline-block overflow-ellipsis overflow-hidden whitespace-nowrap"
                  key={`${team.name}-${index}`}
                >
                  <span className="font-semibold">{team.name} / </span>
                  <span className="capitalize">{team.jobField}</span>
                </NavLink>
              ))
            ) : (
              <NullInfo />
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AllTeams;
