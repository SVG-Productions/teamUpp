import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";

const RecommendedTeams = () => {
  const { recommendedTeams } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);
  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <p className="font-bold text-slate-400">RECOMMENDED TEAMS</p>
        {isTeamsListShowing ? (
          <div className="text-slate-400">&#9650;</div>
        ) : (
          <div className="text-slate-400">&#9660;</div>
        )}
      </div>
      <div className="justify-between sm:pr-4 hidden sm:flex">
        <p className="font-bold text-slate-400 pb-2">RECOMMENDED TEAMS</p>
      </div>
      <ul
        className={`flex flex-col overflow-auto py-2 transition-all duration-500 sm:max-h-none 
        ${isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 py-0"}`}
      >
        {recommendedTeams.length ? (
          recommendedTeams.map((team) => (
            <NavLink
              to={`/teams/${team.id}`}
              className="no-underline text-black bg-white p-2.5 hover:bg-blue-200 border-b border-slate-200 
            inline-block overflow-ellipsis overflow-hidden whitespace-nowrap"
              key={team.id}
            >
              <span className="font-semibold">{team.name} / </span>
              <span className="capitalize">{team.jobField}</span>
            </NavLink>
          ))
        ) : (
          <NullInfo />
        )}
      </ul>
    </div>
  );
};

export default RecommendedTeams;
