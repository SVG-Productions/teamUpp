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
      <AuthedPageTitle>{username}</AuthedPageTitle>
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-[55%] min-h-[430px]">
        <div className="relative flex flex-col items-center gap-4 sm:gap-8 p-4 rounded-sm sm:w-72 bg-slate-100 shadow">
          {isSessionedUserPage && (
            <PencilButton
              href={`/${username}/settings`}
              styling={"absolute right-2 top-2 h-8 w-8"}
              iconSize="16px"
            />
          )}
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-slate-900 text-white font-bold">
            UI
          </div>
          <div className="self-start">
            <UserInfo user={user} />
          </div>
        </div>
        <div className="relative flex flex-col sm:w-3/4 h-80 sm:h-auto rounded-sm bg-slate-100 shadow">
          {isSessionedUserPage && (
            <PencilButton
              href={`/${username}/settings`}
              styling={"absolute right-2 top-2 z-10 h-8 w-8"}
              iconSize="16px"
            />
          )}
          <p className="relative p-4 font-bold shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)]">
            ReadME
          </p>
          <div className="h-full p-4 m-1 mt-0 bg-white rounded-sm overflow-auto">
            {readme ? readme : <NullInfo />}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-1/3 gap-10">
        <ScrollableList title="Teams" width="sm:w-2/3">
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
        <ScrollableList title="All Teammates" width="sm:w-1/3">
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
    </>
  );
};

export const userLoader = async ({ request, params }) => {
  const { username } = params;
  const userResponse = await axios.get(`/api/users/${username}`);
  const { user, teammates, teams } = userResponse.data;

  const filteredTeams = teams.filter(
    (team) => team.status !== "invited" && team.status !== "requested"
  );

  return {
    user,
    teammates,
    teams: filteredTeams,
  };
};
