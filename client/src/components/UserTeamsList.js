import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

const UserTeamsList = ({ heading = "TEAMS" }) => {
  const { userTeams } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className={`flex flex-col`}>
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
        className={`flex flex-col overflow-auto p-2 transition-all duration-500 sm:max-h-none ${
          isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 py-0"
        }`}
      >
        {userTeams.map((team, index) => (
          <NavLink
            to={`/teams/${team.id}`}
            className="bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200 inline-block overflow-ellipsis overflow-hidden whitespace-nowrap"
            key={`${team.name}-${index}`}
          >
            <span className="font-semibold">{team.name} / </span>
            <span className="capitalize">{team.jobField}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default UserTeamsList;
