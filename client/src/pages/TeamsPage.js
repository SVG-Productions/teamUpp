import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import CreateTeamButton from "../components/CreateTeamButton";
import AllTeams from "../components/AllTeams";
import UserTeams from "../components/UserTeams";

export const TeamsPage = () => {
  return (
    <>
      <div className="relative">
        <AuthedPageTitle links={[{ label: "Teams" }]} />
        <CreateTeamButton />
      </div>
      <div className="flex sm:flex-row flex-col w-full gap-10 h-full mt-8 pb-2 overflow-hidden">
        <div className="sm:w-3/4 sm:h-full h-60">
          <AllTeams />
        </div>
        <div className="sm:h-full sm:w-1/4 h-60">
          <UserTeams />
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
