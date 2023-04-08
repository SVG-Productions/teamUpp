import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 p-4 w-full flex items-center h-16 justify-between bg-slate-100 shadow-[0_1px_3px_rgb(0,0,0,0.2)]">
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
      <NavLink
        to="/:user"
        className=" flex items-center justify-center bg-slate-200 rounded-full w-10 h-10 text-xs"
      >
        UI
      </NavLink>
    </div>
  );
};

export default Navbar;
