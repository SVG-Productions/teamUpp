import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavDropdownList from "./NavDropdownList";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Navbar = () => {
  const { authedUser } = useAuth();
  const [isListShowing, setIsListShowing] = useState(false);
  const navButtonRef = useRef();
  useOnClickOutside(navButtonRef, () => setIsListShowing(false));

  return (
    <div className="sticky top-0 z-20 p-4 w-full flex items-center h-16 justify-between bg-slate-100 shadow-[0_1px_3px_rgb(0,0,0,0.2)]">
      <div className="flex gap-4 sm:gap-10 items-center">
        <NavLink to="/" className="sm:text-lg text:md font-bold">
          TeamApp
        </NavLink>
        <NavLink to="/teams" className="text-sm sm:text-base">
          Teams
        </NavLink>
        <NavLink
          to={`/${authedUser?.username}/favorites`}
          className="text-sm sm:text-base"
        >
          Favorites
        </NavLink>
      </div>
      <div ref={navButtonRef}>
        <button
          className="flex items-center gap-1"
          onClick={() => setIsListShowing(isListShowing ? false : true)}
        >
          {isListShowing ? (
            <div className="text-slate-500">&#9650;</div>
          ) : (
            <div className="text-slate-500">&#9660;</div>
          )}
          <div
            to="/:user"
            className=" flex items-center justify-center bg-slate-900 rounded-full w-10 h-10 text-xs font-semibold text-white"
          >
            UI
          </div>
        </button>
        <div className="relative w-full">
          {isListShowing && (
            <NavDropdownList setIsListShowing={setIsListShowing} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
