import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserTeamsList = ({ heading = "TEAMS" }) => {
  const { userData } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <p className="font-bold text-slate-400">{heading}</p>
        {isTeamsListShowing ? (
          <div className="text-slate-400">&#9650;</div>
        ) : (
          <div className="text-slate-400">&#9660;</div>
        )}
      </div>
      <div className="justify-between sm:pr-4 hidden sm:flex">
        <p className="font-bold text-slate-400 pb-2">{heading}</p>
      </div>
      <ul
        className={`flex flex-col overflow-auto transition-all duration-500 sm:max-h-none ${
          isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 overflow-hidden"
        }`}
      >
        {userData.teams.length ? (
          userData.teams.map((team) => (
            <li key={team.id}>
              <NavLink
                to={`/teams/${team.id}`}
                className="no-underline text-black bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200 inline-block truncate"
              >
                <span className="font-semibold">{team.name} / </span>
                <span className="capitalize">{team.jobField}</span>
              </NavLink>
            </li>
          ))
        ) : (
          <NullInfo />
        )}
      </ul>
    </div>
  );
};

export default UserTeamsList;
