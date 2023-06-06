import { NavLink, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faPlusCircle,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
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
  const [sortBy, setSortBy] = useState("name");
  const [isSortDown, setIsSortDown] = useState(true);
  const [filterBy, setFilterBy] = useState([]);

  const filteredTeams = filterTeams(teamsData, filterBy);
  const sortedTeams = sortTeams(filteredTeams, sortBy, isSortDown);

  const handleSortClick = (sortByCategory) => {
    if (sortByCategory === sortBy) {
      setIsSortDown(!isSortDown);
    } else {
      setSortBy(sortByCategory);
      setIsSortDown("down");
    }
  };
  return (
    <>
      <FilterTeamsModal
        isFilterModalShowing={isFilterModalShowing}
        handleFilterModal={handleFilterModal}
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
              <th className="py-2.5">
                <button
                  onClick={() => handleSortClick("name")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "name" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Name</span>
                  {sortBy === "name" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSortClick("field")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "field" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Job interest</span>
                  {sortBy === "field" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="hidden text-center sm:table-cell">
                <button
                  onClick={() => handleSortClick("userCount")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "userCount" && "text-secondary"
                  }`}
                >
                  <span className="mr-1"># of members</span>
                  {sortBy === "userCount" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
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
      </div>
    </>
  );
};

export default AllTeams;
