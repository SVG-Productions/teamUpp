import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const NavDropdownList = ({
  setIsListShowing,
}: {
  setIsListShowing: (boolean: boolean) => void;
}) => {
  const { authedUser, logout } = useAuth();

  const handleSignout = async () => {
    await logout();
  };

  return (
    <div className="absolute flex flex-col top-0.5 right-0.5 z-30">
      <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
      <div className="flex flex-col w-40 bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
        <span className="border-b border-borderprimary p-2">
          Signed in as <span className="font-bold">{authedUser?.username}</span>
        </span>
        <NavLink
          onClick={() => setIsListShowing(false)}
          to={`/${authedUser?.username}`}
          className="p-2 no-underline text-primary hover:bg-highlightSecondary"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Profile
        </NavLink>
        <NavLink
          onClick={() => setIsListShowing(false)}
          to={`/${authedUser?.username}/settings`}
          className="p-2 no-underline text-primary hover:bg-highlightSecondary"
        >
          <FontAwesomeIcon icon={faGear} className="mr-2" />
          Settings
        </NavLink>
        <button
          onClick={handleSignout}
          className="p-2 text-primary text-start hover:bg-highlightSecondary"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default NavDropdownList;
