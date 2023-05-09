import { useLoaderData, NavLink } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import NullInfo from "../components/NullInfo";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../context/AuthContext";
import PencilButton from "../components/PencilButton";

export const UserPage = () => {
  const { user, teammates, teams } = useLoaderData();
  const { authedUser } = useAuth();

  const { readme, username } = user;
  const isSessionedUserPage = authedUser.username === user.username;

  return (
    <>
      <AuthedPageTitle links={[{ label: username }]} />
      <div className="flex w-full h-full mt-4">
        <div className="relative flex flex-col items-center gap-4 sm:gap-8 p-4 rounded-sm sm:w-1/4 sm:h-full bg-slate-100 shadow">
          {isSessionedUserPage && (
            <PencilButton
              href={`/${username}/settings`}
              styling={"absolute right-2 top-2 h-8 w-8"}
              iconSize="16px"
            />
          )}
          <div className="flex items-center justify-center w-32 h-32 mt-8 rounded-full bg-slate-900 text-white font-bold">
            UI
          </div>
          <div className="self-start">
            <UserInfo user={user} />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/2 px-8 py-4">
          <div className="relative flex flex-col h-80 sm:h-auto rounded-sm">
            <div className="flex justify-between">
              <p className="font-bold text-slate-400">ReadME</p>
            </div>
            <div className="h-full px-4 py-2">
              {readme ? readme : <NullInfo />}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-slate-400">Teams</p>
            {teams.map((team, index) => (
              <NavLink
                to={`/teams/${team.id}`}
                className="bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200"
                key={`${team.name}-${index}`}
              >
                <span className="font-semibold">{team.name} / </span>
                <span>{team.jobField}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="sm:w-1/4">
          <ScrollableList title="All Teammates">
            {teammates.map((teammate, index) => (
              <NavLink
                to={`/${teammate.username}`}
                className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
                key={`${teammate.id}-${index}`}
              >
                <div className="bg-white rounded-full w-6 h-6 mr-4" />
                <p> {teammate.username}</p>
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
    </>
  );
};

export const userLoader = async ({ request, params }) => {
  const { username } = params;
  const userResponse = await axios.get(`/api/users/${username}`);
  const { user, teammates, teams, jobFields } = userResponse.data;

  const filteredTeams = teams.filter(
    (team) => team.status !== "invited" && team.status !== "requested"
  );
  const flattenedJobFields = jobFields.map((jf) => jf.jobField);

  return {
    user,
    teammates,
    teams: filteredTeams,
    jobFields: flattenedJobFields,
  };
};
