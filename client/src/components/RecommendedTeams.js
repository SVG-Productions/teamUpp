import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";

const RecommendedTeams = () => {
  const { userData } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);
  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <h3 className="font-bold text-headingColor">RECOMMENDED TEAMS</h3>
        {isTeamsListShowing ? (
          <div className="text-headingColor">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <div className="justify-between sm:pr-4 hidden sm:flex">
        <h3 className="font-bold text-headingColor pb-2">RECOMMENDED TEAMS</h3>
      </div>
      <ul
        className={`flex flex-col overflow-auto py-2 transition-all duration-500 sm:max-h-none 
        ${isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 py-0"}`}
      >
        {userData.recommendedTeams.length ? (
          userData.recommendedTeams.map((team) => (
            <NavLink
              to={`/teams/${team.id}`}
              className="no-underline text-primary p-2.5 hover:bg-highlight border-b border-borderprimary border-gray-700 
            inline-block truncate"
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
