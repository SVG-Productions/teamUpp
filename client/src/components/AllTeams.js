import { NavLink, useLoaderData } from "react-router-dom";
import { useState } from "react";
import SortByDropdown from "./SortByDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import FilterByInterests from "./FilterByInterests";
import sortTeams from "../utils/sortTeams";
import filterTeams from "../utils/filterTeams";
import FilterTeamsModal from "./FilterTeamsModal";
import NullInfo from "./NullInfo";
import SearchInput from "./SearchInput";

const AllTeams = ({
  isFilterModalShowing,
  handleCreateModal,
  handleFilterModal,
}) => {
  const { teamsData } = useLoaderData();

  const [searchTeam, setSearchTeam] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [filterBy, setFilterBy] = useState([]);

  const sortValues = ["none", "name", "field"];
  const filteredTeams = filterTeams(teamsData, filterBy);
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
      <div className="flex justify-between items-center">
        <div
          className="flex w-full items-center justify-between border-b border-borderprimary pb-1 mb-2 
        sm:mb-4 sm:pb-0"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faSliders}
              size="lg"
              className="text-iconPrimary cursor-pointer sm:hidden hover:text-iconSecondary"
              onClick={handleFilterModal}
            />
            <h1 className="text-headingColor font-semibold sm:pb-2">
              All teams
            </h1>
          </div>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="xl"
            onClick={() => handleCreateModal(true)}
            className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
          />
        </div>
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
          <FilterByInterests filterBy={filterBy} setFilterBy={setFilterBy} />
          <ul className="flex flex-col overflow-auto p-2">
            {sortedTeams.length ? (
              sortedTeams.map((team, index) => (
                <li key={`${team.name}-${index}`}>
                  <NavLink
                    to={`/teams/${team.id}`}
                    className="w-full no-underline text-primary p-2.5 hover:bg-highlight border-b border-borderprimary inline-block truncate"
                  >
                    <span className="font-semibold">{team.name} / </span>
                    <span className="capitalize">{team.jobField}</span>
                  </NavLink>
                </li>
              ))
            ) : (
              <li>
                <NullInfo />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AllTeams;
