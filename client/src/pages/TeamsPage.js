import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import ScrollableList from "../components/ScrollableList";
import AuthedPageTitle from "../components/AuthedPageTitle";
import CreateTeamButton from "../components/CreateTeamButton";
import AllTeams from "../components/AllTeams";

export const TeamsPage = () => {
  const { userTeams } = useLoaderData();

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
