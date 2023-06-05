import axios from "axios";
import AllTeams from "../components/AllTeams";
import shuffle from "../utils/shuffleArray";
import RecommendedTeams from "../components/RecommendedTeams";
import { useState } from "react";
import UserTeamsSideList from "../components/UserTeamsSideList";
import CreateTeamModal from "../components/CreateTeamModal";

export const TeamsPage = () => {
  const [isFilterModalShowing, setIsFilterModalShowing] = useState(false);
  const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
  return (
    <>
      {isCreateModalShowing && (
        <CreateTeamModal handleModal={setIsCreateModalShowing} />
      )}
      <div
        className={`flex flex-col flex-grow self-center w-full p-6 pb-8
        ${
          (isFilterModalShowing || isCreateModalShowing) &&
          "max-h-[calc(100vh-12rem)] overflow-hidden"
        } sm:flex-row sm:gap-8 sm:max-h-full sm:max-w-7xl sm:pt-10`}
      >
        <div className="sm:w-3/4">
          <AllTeams
            handleCreateModal={setIsCreateModalShowing}
            isFilterModalShowing={isFilterModalShowing}
            handleFilterModal={setIsFilterModalShowing}
          />
        </div>
        <div className="sm:w-1/4 sm:min-w-[250px]">
          <div className="py-6 sm:w-full sm:pt-2">
            <UserTeamsSideList />
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
  const userData = userResponse.data;
  const teamsData = allTeamsResponse.data;
  userData.recommendedTeams = shuffle(userResponse.data.recommendedTeams).slice(
    0,
    4
  );

  return { userData, teamsData };
};
