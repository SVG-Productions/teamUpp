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
        sm:py-4 sm:px-12 sm:pt-8"
      >
        <div className="flex flex-row w-full sm:w-1/2">
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
        <div className="py-6 sm:w-3/4 sm:h-full ">
          <AllTeams />
        </div>
        <div className="py-6 sm:h-full sm:w-1/4 ">
          <UserTeams />
        </div>
        <div className="py-6 sm:h-full sm:w-1/4 ">
          <RecommendedTeams />
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
  const { teams: userTeams } = userResponse.data;
  return { teams, userTeams, recommendedTeams };
};
