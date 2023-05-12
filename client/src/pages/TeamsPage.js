import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import CreateTeamButton from "../components/CreateTeamButton";
import AllTeams from "../components/AllTeams";
import UserTeams from "../components/UserTeams";
import FormField from "../components/FormField";
import shuffle from "../utils/shuffleArray";
import { useState } from "react";
import RecommendedTeams from "../components/RecommendedTeams";

export const TeamsPage = () => {
  const [searchTeam, setSearchTeam] = useState("");

  return (
    <>
      <AuthedPageTitle links={[{ label: "Teams" }]}>
        <CreateTeamButton />
      </AuthedPageTitle>
      <div
        className="flex flex-col flex-grow w-full rounded-sm p-6  
        sm:flex-row sm:py-4 sm:px-12 sm:pt-8"
      >
        <div className="sm:w-3/4">
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
            <AllTeams />
          </div>
        </div>
        <div className="sm:w-1/4 sm:min-w-[275px]">
          <div className="py-6 sm:w-full sm:pt-2">
            <UserTeams />
          </div>
          <div className="py-6 sm:w-full ">
            <RecommendedTeams />
          </div>
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
  const recommendedTeams = shuffle(userResponse.data.recommendedTeams).slice(
    0,
    4
  );
  const teams = allTeamsResponse.data;
  const user = userResponse.data;
  const { teams: userTeams } = user;
  return { teams, userTeams, recommendedTeams, user };
};
