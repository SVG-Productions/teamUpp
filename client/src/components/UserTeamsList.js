import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserTeamsList = ({ heading = "Teams" }) => {
  const { userData } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <h1 className="text-headingColor font-semibold pb-2">{heading}</h1>
        {isTeamsListShowing ? (
          <div className="text-headingColor">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <h1 className="hidden text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary sm:flex">
        {heading}
      </h1>
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
                className="w-full no-underline text-primary p-2.5 hover:bg-highlight border-b border-borderprimary inline-block truncate"
              >
                <span className="font-semibold">{team.name} / </span>
                <span className="capitalize">{team.jobField}</span>
              </NavLink>
            </li>
          ))
        ) : (
          <li>
            <NullInfo />
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserTeamsList;
