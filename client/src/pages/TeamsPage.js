import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import sortTeams from "../utils/sortTeams";
import ScrollableList from "../components/ScrollableList";
import AuthedPageTitle from "../components/AuthedPageTitle";

const TeamsPage = () => {
  const [sortBy, setSortBy] = useState("none");

  const { allTeamsData, userTeamsData } = useLoaderData();
  const { teams } = allTeamsData.data;
  const { userTeams } = userTeamsData.data;

  const sortedTeams = sortTeams(teams, sortBy);

  console.log(teams);

  return (
    <>
      <AuthedPageTitle>Teams</AuthedPageTitle>
      <div className="flex sm:flex-row flex-col w-full gap-10 h-full mt-8 overflow-hidden">
        <ScrollableList
          title="Teams"
          width="sm:w-3/4"
          height="sm:h-full"
          hasSortBy={true}
          sortBy={sortBy}
          setSortBy={setSortBy}
        >
          {sortedTeams.map((team, index) => (
            <NavLink
              to={`/teams/${team.id}`}
              className="flex justify-between bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
              key={`${team.name}-${index}`}
            >
              <div className="flex gap-1">
                <p className="font-semibold">{team.name} /</p>
                <p>{team.jobField}</p>
              </div>
              <div className="w-6 h-6 rounded-full text-center text-white bg-blue-800">
                #
              </div>
            </NavLink>
          ))}
        </ScrollableList>
        <ScrollableList title="Your Teams" width="sm:w-1/4" height="sm:h-full">
          {userTeams.map((team) => (
            <NavLink
              to={`/teams/${team.id}`}
              key={team.id}
              className="bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
            >
              {team.name}
            </NavLink>
          ))}
        </ScrollableList>
      </div>
    </>
  );
};

export default TeamsPage;
