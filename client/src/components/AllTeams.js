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

  console.log(teamsData);

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
      <div className="flex gap-2 w-full py-4 sm:w-1/2 sm:min-w-[440px]">
        <SearchInput
          placeholder="Search teams..."
          searchValue={searchTeam}
          handleChange={setSearchTeam}
        />
      </div>
      <div className="flex flex-col">
        <FilterByInterests filterBy={filterBy} setFilterBy={setFilterBy} />
        <table className="table-fixed w-full sm:table-auto mt-4">
          <thead>
            <tr className="text-left text-sm border-b border-borderprimary">
              <th className="py-2.5">Team</th>
              <th>Job Interest</th>
              <th className="hidden text-center sm:table-cell"># of members</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.length ? (
              sortedTeams.map((team) => (
                <tr key={team.id} className="text-primary hover:bg-highlight">
                  <td className="py-2.5 pr-2">
                    <NavLink
                      to={`/teams/${team.id}`}
                      className="flex items-center"
                    >
                      <img
                        src={team.photo || team.avatar}
                        alt={team.name}
                        width={28}
                        className="rounded-full mr-3"
                      />
                      <span className="truncate">{team.name}</span>
                    </NavLink>
                  </td>
                  <td className="capitalize text-primary text-sm truncate">
                    {team.jobField}
                  </td>
                  <td className="hidden w-20 text-center sm:table-cell">
                    {team.userCount}
                  </td>
                </tr>
              ))
            ) : (
              <NullInfo />
            )}
          </tbody>
        </table>
        {/* <ul className="flex flex-col overflow-auto p-2">
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
          </ul> */}
      </div>
    </>
  );
};

export default AllTeams;
