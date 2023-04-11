import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import ScrollableList from "../components/ScrollableList";
import AuthedPageTitle from "../components/AuthedPageTitle";

const TeamsPage = () => {
  const { allTeamsData, userTeamsData } = useLoaderData();
  const { teams } = allTeamsData.data;
  const { userTeams } = userTeamsData.data;

  return (
    <>
      <AuthedPageTitle>Teams</AuthedPageTitle>
      <div className="flex sm:flex-row flex-col w-full gap-10 h-full mt-8 overflow-hidden">
        <ScrollableList
          title="Teams"
          width="sm:w-3/4"
          height="sm:h-full"
          sortBy={true}
        >
          {teams.map((team, index) => (
            <NavLink
              to={`/teams/${team.id}`}
              className="bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
              key={`${team.name}-${index}`}
            >
              {team.name}
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
