import { NavLink, useLoaderData } from "react-router-dom";
import ScrollableList from "./ScrollableList";
import { useState } from "react";
import sortTeams from "../utils/sortTeams";

const AllTeams = () => {
  const { teams } = useLoaderData();
  const [sortBy, setSortBy] = useState("none");

  const sortedTeams = sortTeams(teams, sortBy);

  return (
    <ScrollableList
      title="Teams"
      hasSortBy={true}
      sortBy={sortBy}
      setSortBy={setSortBy}
    >
      {sortedTeams.map((team, index) => (
        <NavLink
          to={`/teams/${team.id}`}
          className="flex justify-between text-xs sm:text-base bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
          key={`${team.name}-${index}`}
        >
          <div className="flex gap-1">
            <p className="font-semibold">{team.name} /</p>
            <p>{team.jobField}</p>
          </div>
          <div className="flex w-6 h-6 rounded-full items-center justify-center text-white bg-blue-800 text-xs">
            {team.userCount}
          </div>
        </NavLink>
      ))}
    </ScrollableList>
  );
};

export default AllTeams;
