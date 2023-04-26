import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import sortTeams from "../utils/sortTeams";
import ScrollableList from "../components/ScrollableList";
import AuthedPageTitle from "../components/AuthedPageTitle";
import CreateTeamButton from "../components/CreateTeamButton";

export const TeamsPage = () => {
  const { teams, userTeams } = useLoaderData();

  const [sortBy, setSortBy] = useState("none");
  const sortedTeams = sortTeams(teams, sortBy);

  return (
    <>
      <div className="relative">
        <AuthedPageTitle>Teams</AuthedPageTitle>
        <CreateTeamButton />
      </div>
      <div className="flex sm:flex-row flex-col w-full gap-10 h-full mt-8 pb-2 overflow-hidden">
        <div className="sm:w-3/4 sm:h-full h-60">
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
        </div>
        <div className="sm:h-full sm:w-1/4 h-60">
          <ScrollableList title="Your Teams">
            {userTeams.map((team) => (
              <NavLink
                to={`/teams/${team.id}`}
                key={team.id}
                className="flex justify-between bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
              >
                <p className="text-xs sm:text-base">{team.name}</p>
                <div
                  className={`w-6 h-6 rounded-full text-center text-white ${
                    team.status === "invited" || team.status === "requested"
                      ? "bg-yellow-300"
                      : "bg-emerald-400"
                  } `}
                />
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
    </>
  );
};

export const teamsLoader = async ({ request, params }) => {
  const [userResponse, allTeamsResponse] = await Promise.all([
    axios.get("/api/session/user"),
    axios.get("/api/teams"),
  ]);
  const teams = allTeamsResponse.data;
  const { teams: userTeams } = userResponse.data;
  return { teams, userTeams };
};
