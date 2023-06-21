import axios from "axios";
import AllTeams from "../components/AllTeams";
import shuffle from "../utils/shuffleArray";
import { useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";
import { useLoaderData } from "react-router-dom";
import TeamsSideList from "../components/TeamsSideList";

export const TeamsPage = () => {
  const { userData } = useLoaderData();
  const { teams, recommendedTeams } = userData;
  const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
  return (
    <>
      {isCreateModalShowing && (
        <CreateTeamModal handleModal={setIsCreateModalShowing} />
      )}
      <div
        className={`flex flex-col flex-grow self-center w-full p-6 pt-10 pb-8
        ${
          isCreateModalShowing && "max-h-[calc(100vh-12rem)] overflow-hidden"
        } sm:flex-row sm:gap-12 sm:max-h-full sm:max-w-7xl`}
      >
        <div className="sm:w-3/4">
          <AllTeams handleCreateModal={setIsCreateModalShowing} />
        </div>
        <div className="sm:w-1/4 sm:min-w-[250px]">
          <div className="py-6 sm:w-full sm:pt-2">
            <TeamsSideList heading="Your teams" teams={teams} />
          </div>
          <div className="py-6 sm:w-full ">
            <TeamsSideList
              heading="Recommended teams"
              teams={recommendedTeams}
              nullInfo="No recommended teams."
            />
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
  const userData = userResponse.data;
  const teamsData = allTeamsResponse.data;
  userData.recommendedTeams = shuffle(userResponse.data.recommendedTeams).slice(
    0,
    4
  );

  return { userData, teamsData };
};
