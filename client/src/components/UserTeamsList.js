import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

const UserTeamsList = () => {
  const { teams } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <p className="font-bold text-slate-400">TEAMS</p>
        {isTeamsListShowing ? (
          <div className="text-slate-400">&#9650;</div>
        ) : (
          <div className="text-slate-400">&#9660;</div>
        )}
      </div>
      <div className="sm:flex justify-between sm:pr-4 hidden sm:visible">
        <p className="font-bold text-slate-400 pb-2">TEAMS</p>
      </div>
      <ul
        className={`flex flex-col overflow-auto p-2 sm:max-h-none transition-all duration-500 ${
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
  );
};

export default UserTeamsList;
