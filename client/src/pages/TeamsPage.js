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
  console.log(teams);

  const [sortBy, setSortBy] = useState("none");
  const sortedTeams = sortTeams(teams, sortBy);

  return (
    <>
      <div className="relative">
        <AuthedPageTitle>Teams</AuthedPageTitle>
        <CreateTeamButton />
      </div>
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
              className="flex justify-between text-xs sm:text-base bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
              key={`${team.name}-${index}`}
            >
              <div className="flex gap-1">
                <p className="font-semibold">{team.name} /</p>
                <p>{team.jobField}</p>
              </div>
              <div className="flex w-6 h-6 rounded-full items-center justify-center text-white bg-blue-800">
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
    </>
  );
};

export const teamsLoader = async ({ request, params }) => {
  const { data } = await axios.get("/api/session");
  if (data) {
    const { id: userId } = data;
    const [userTeamsData, allTeamsData] = await Promise.all([
      axios.get(`/api/users/${userId}/user-teams`),
      axios.get("/api/teams"),
    ]);
    const teams = allTeamsData.data;
    const userTeams = userTeamsData.data;
    return { teams, userTeams };
  }
  return null;
};
