import axios from "axios";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Teammates = () => {
  const { teamData } = useLoaderData();
  const { authedUser } = useAuth();
  const [isTeamsListShowing, setIsTeamsListShowing] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() => setIsTeamsListShowing(isTeamsListShowing ? false : true)}
      >
        <h1 className="text-headingColor font-semibold pb-2">Team members</h1>
        {isTeamsListShowing ? (
          <div className="text-headingColor">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <h2 className="hidden text-headingColor font-semibold pb-2 sm:flex">
        Team members
      </h2>
      <ul
        className={`flex flex-col overflow-auto transition-all duration-500 sm:max-h-none ${
          isTeamsListShowing ? "max-h-[50rem]" : "max-h-0 overflow-hidden"
        }`}
      >
        {teamData.teammates.map((teammate) => (
          <li key={teammate.id}>
            <NavLink
              to={`/${teammate.username}`}
              className="flex items-center gap-1 no-underline text-primary p-2.5 rounded-sm hover:bg-highlight truncate sm:px-1"
            >
              <img
                className="rounded-full mr-2"
                src={teammate.photo || teammate.avatar}
                width={28}
                height={28}
                alt={teammate.username}
              />
              <span className="truncate">{teammate.username}</span>
              <span className="text-xs text-gray-400 ml-auto">
                {teammate.status}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teammates;
