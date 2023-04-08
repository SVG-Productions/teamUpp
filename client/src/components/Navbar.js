import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavDropdownList from "./NavDropdownList";

const Navbar = () => {
  const [isListShowing, setIsListShowing] = useState(false);
  return (
    <div className="sticky top-0 z-20 p-4 w-full flex items-center h-16 justify-between bg-slate-100 shadow-[0_1px_3px_rgb(0,0,0,0.2)]">
      {isListShowing && <NavDropdownList />}
      <div className="flex gap-4 sm:gap-10 items-center">
        <NavLink to="/" className="sm:text-lg text:md font-bold">
          TeamApp
        </NavLink>
        <NavLink to="/teams" className="text-sm sm:text-base">
          Teams
        </NavLink>
        <NavLink to="/:user/favorites" className="text-sm sm:text-base">
          Favorites
        </NavLink>
      </div>
      <button
        className="flex items-center gap-1"
        onClick={() => setIsListShowing(isListShowing ? false : true)}
      >
        <div>&#9660;</div>
        <div
          to="/:user"
          className=" flex items-center justify-center bg-slate-200 rounded-full w-10 h-10 text-xs"
        >
          UI
        </div>
      </button>
    </div>
  );
};

export default Navbar;
