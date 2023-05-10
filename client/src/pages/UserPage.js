import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import NullInfo from "../components/NullInfo";
import UserInfo from "../components/UserInfo";
import PencilButton from "../components/PencilButton";
import UserInterests from "../components/UserInterests";

export const UserPage = () => {
  const { user, teammates, teams } = useLoaderData();
  const { authedUser } = useAuth();

  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);
  const [isTeammatesListShowing, setIsTeammatesListShowing] = useState(false);
  const [isReadmeShowing, setIsReadmeShowing] = useState(false);

  const { readme, username } = user;
  const isSessionedUserPage = authedUser.username === user.username;

  return (
    <>
      <AuthedPageTitle links={[{ label: username }]} />
      <div className="top-32 flex flex-col flex-grow sm:flex-row w-full h-full">
        <div className="sm:w-1/4 sm:bg-slate-100">
          <div className="sticky top-32 flex flex-col items-center gap-4 sm:gap-8 p-4 rounded-sm sm:bg-slate-100">
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
        </div>
        <div className="flex flex-col gap-8 sm:gap-4 sm:w-1/2 px-8 py-4">
          <UserInterests />
          <div className="flex flex-col">
            <div
              onClick={() => setIsReadmeShowing(!isReadmeShowing)}
              className="flex justify-between cursor-pointer sm:hidden pb-2"
            >
              <p className="font-bold text-slate-400">README</p>
              {isReadmeShowing ? (
                <div className="text-slate-500">&#9650;</div>
              ) : (
                <div className="text-slate-500">&#9660;</div>
              )}
            </div>
            <div className="sm:flex hidden pb-2">
              <p className="font-bold text-slate-400">README</p>
            </div>
            <div
              className={`px-2 overflow-auto transition-all duration-300 sm:max-h-none ${
                isReadmeShowing ? "max-h-[50rem]" : "max-h-0"
              }`}
            >
              {readme ? readme : <NullInfo />}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="flex justify-between cursor-pointer sm:hidden"
              onClick={() =>
                setIsTeamsListShowing(isTeamsListShowing ? false : true)
              }
            >
              <p className="font-bold text-slate-400">TEAMS</p>
              {isTeamsListShowing ? (
                <div className="text-slate-500">&#9650;</div>
              ) : (
                <div className="text-slate-500">&#9660;</div>
              )}
            </div>
            <div className="sm:flex justify-between sm:pr-4 hidden sm:visible">
              <p className="font-bold text-slate-400 pb-2">TEAMS</p>
            </div>
            <ul
              className={`flex flex-col overflow-auto p-2 sm:max-h-none transition-all duration-300 ${
                isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 py-0"
              }`}
            >
              {teams.map((team, index) => (
                <NavLink
                  to={`/teams/${team.id}`}
                  className="bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200"
                  key={`${team.name}-${index}`}
                >
                  <span className="font-semibold">{team.name} / </span>
                  <span className="capitalize">{team.jobField}</span>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
        <div className="sm:w-1/4 py-4 px-8 sm:px-0">
          <div
            className="flex justify-between sm:pr-4 cursor-pointer sm:hidden"
            onClick={() =>
              setIsTeammatesListShowing(isTeammatesListShowing ? false : true)
            }
          >
            <p className="font-bold text-slate-400 pb-2"> ALL TEAMMATES</p>
            {isTeammatesListShowing ? (
              <div className="text-slate-500 sm:hidden">&#9650;</div>
            ) : (
              <div className="text-slate-500">&#9660;</div>
            )}
          </div>
          <div className="sm:flex justify-between pr-4 hidden sm:visible">
            <p className="font-bold text-slate-400 pb-2"> ALL TEAMMATES</p>
          </div>
          <ul
            className={`flex flex-col px-2 transition-all overflow-auto sm:max-h-none duration-300 ${
              isTeammatesListShowing ? "max-h-[50rem]" : "max-h-0"
            }`}
          >
            {teammates.map((teammate, index) => (
              <NavLink
                to={`/${teammate.username}`}
                className="flex p-2.5 rounded-sm hover:bg-blue-100"
                key={`${teammate.id}-${index}`}
              >
                <div className="bg-slate-900 rounded-full w-6 h-6 mr-4" />
                <p> {teammate.username}</p>
              </NavLink>
            ))}
          </ul>
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
