import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";
import React from "react";

const UserTeamsSideList = () => {
  const { userData } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <h1 className="text-headingColor font-semibold pb-2">Your teams</h1>
        {isTeamsListShowing ? (
          <div className="text-headingColor">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <h2 className="hidden text-headingColor font-semibold pb-2 sm:flex">
        Your teams
      </h2>
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
                className="flex no-underline text-primary p-2.5 rounded-sm hover:bg-highlight truncate"
              >
                <img
                  className="rounded-full mr-4"
                  src={team.photo || team.avatar}
                  width={28}
                  height={28}
                  alt={team.username}
                />
                <span className="truncate">{team.name}</span>
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

export default UserTeamsSideList;
