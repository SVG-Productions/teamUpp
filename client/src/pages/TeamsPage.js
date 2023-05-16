import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import CreateTeamButton from "../components/CreateTeamButton";
import AllTeams from "../components/AllTeams";
import shuffle from "../utils/shuffleArray";
import RecommendedTeams from "../components/RecommendedTeams";
import { useState } from "react";
import UserTeamsList from "../components/UserTeamsList";

export const TeamsPage = () => {
  const [isFilterModalShowing, setIsFilterModalShowing] = useState(false);

  return (
    <>
      <AuthedPageTitle links={[{ label: "Teams" }]}>
        <CreateTeamButton />
      </AuthedPageTitle>
      <div
        className={`flex flex-col flex-grow w-full rounded-sm p-6 
        ${isFilterModalShowing && "max-h-[calc(100vh-12rem)] overflow-hidden"} 
        sm:flex-row sm:overflow-y-scroll sm:py-4 sm:px-12 sm:pt-8`}
      >
        <div className="sm:w-3/4">
          <AllTeams
            isFilterModalShowing={isFilterModalShowing}
            handleFilterModal={setIsFilterModalShowing}
          />
        </div>
        <div className="sm:w-1/4 sm:min-w-[250px]">
          <div className="py-6 sm:w-full sm:pt-2">
            <UserTeamsList heading="YOUR TEAMS" />
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
