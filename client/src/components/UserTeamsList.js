import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserTeamsList = () => {
  const { userData } = useLoaderData();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <h1 className="text-headingColor font-semibold pb-2">Teams</h1>
        {isTeamsListShowing ? (
          <div className="text-headingColor">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <h1 className="hidden text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary sm:flex">
        Teams
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
                className="flex w-full items-center no-underline text-primary p-1.5 
                 hover:bg-highlight hover:no-underline"
              >
                <img
                  className="rounded-full mr-4 w-7 h-7"
                  src={team.photo || team.avatar}
                  width={28}
                  height={28}
                  alt={team.username}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="font-semibold">{team.name}</span>
                  <span className="capitalize text-secondary sm:ml-4">
                    {team.jobField}
                  </span>
                </div>
              </NavLink>
            </li>
          ))
        ) : (
          <li className="px-2">
            <NullInfo />
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserTeamsList;
