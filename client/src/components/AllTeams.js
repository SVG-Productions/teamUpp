import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import FilterByInterests from "./FilterByInterests";
import NullInfo from "./NullInfo";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";

const AllTeams = ({ handleCreateModal }) => {
  const { teamsData } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams({ sort: "nameDesc" });
  const [searchTeam, setSearchTeam] = useState("");

  const handleSortClick = (sortByCategory) => {
    if (sortByCategory + "Asc" === searchParams.get("sort")) {
      setSearchParams((prev) => {
        searchParams.set("sort", sortByCategory + "Desc");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        searchParams.set("sort", sortByCategory + "Asc");
        return prev;
      });
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex w-full items-center justify-between border-b border-borderprimary pb-1 mb-4">
          <h1 className="text-headingColor font-semibold pb-2">All teams</h1>
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
      <div className="flex flex-col sm:min-h-[587px]">
        <FilterByInterests />
        <table className="table-fixed w-full sm:table-auto mt-4">
          <thead>
            <tr className="text-left text-sm border-b border-borderprimary">
              <th className="py-2.5">
                <button
                  onClick={() => handleSortClick("name")}
                  className={`flex items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("name") &&
                    "text-secondary"
                  }`}
                >
                  <span className="mr-1">Name</span>
                  {searchParams.get("sort")?.includes("name") &&
                  searchParams.get("sort")?.includes("Desc") ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSortClick("job_field")}
                  className={`flex items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("job_field") &&
                    "text-secondary"
                  }`}
                >
                  <span className="mr-1">Job interest</span>
                  {searchParams.get("sort")?.includes("job_field") &&
                  searchParams.get("sort")?.includes("Desc") ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="hidden text-center sm:table-cell">
                <button
                  onClick={() => handleSortClick("user_count")}
                  className={`flex items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("user_count") &&
                    "text-secondary"
                  }`}
                >
                  <span className="mr-1"># of members</span>
                  {searchParams.get("sort")?.includes("user_count") &&
                  searchParams.get("sort")?.includes("Desc") ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {teamsData.teams.length !== 0 &&
              teamsData.teams.map((team) => (
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
                        height={28}
                        className="rounded-full mr-3 w-7 h-7"
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
              ))}
          </tbody>
        </table>
        {teamsData.teams.length === 0 && (
          <div className="p-4">
            <NullInfo message="There are no teams. Be the first to create one!" />
          </div>
        )}
      </div>
      <Pagination count={teamsData.totalCount} />
    </>
  );
};

export default AllTeams;
