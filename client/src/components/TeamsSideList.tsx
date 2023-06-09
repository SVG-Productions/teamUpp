import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";
import { TeamType } from "../../type-definitions";

interface TeamsSideListProps {
  heading: string;
  teams: TeamType[];
  nullInfo?: string;
}

const TeamsSideList = ({
  heading,
  teams,
  nullInfo = "No teams. Join or create one!",
}: TeamsSideListProps) => {
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <h1 className="font-semibold text-headingColor pb-2">{heading}</h1>
        {isTeamsListShowing ? (
          <div className="text-headingColor">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <h2 className="hidden text-headingColor font-semibold pb-2 sm:flex">
        {heading}
      </h2>
      <ul
        className={`flex flex-col overflow-auto transition-all duration-500 sm:max-h-none 
        ${isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 overflow-hidden"}`}
      >
        {teams.length ? (
          teams.map((team: TeamType) => (
            <li key={team.id}>
              <NavLink
                to={`/teams/${team.id}`}
                className="flex w-full items-center no-underline text-primary p-2.5 
                 hover:bg-highlight hover:no-underline"
              >
                <img
                  className="rounded-full mr-4 w-7 h-7"
                  src={team.photo || team.avatar}
                  width={28}
                  height={28}
                  alt={team.name}
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{team.name}</p>
                  <p className="capitalize text-sm text-secondary">
                    {team.jobField}
                  </p>
                </div>
              </NavLink>
            </li>
          ))
        ) : (
          <li>
            <NullInfo message={nullInfo} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default TeamsSideList;
