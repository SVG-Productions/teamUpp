import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-3 w-full flex items-center h-16 justify-between shadow-[0_1px_3px_rgb(0,0,0,0.2)]">
      <div className="flex gap-10 items-center">
        <NavLink to="/" className="text-lg">
          TeamApp
        </NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/:user/favorites">Favorites</NavLink>
      </div>
      <NavLink
        to="/:user"
        className=" flex items-center justify-center bg-slate-300 rounded-full w-10 h-10 text-xs"
      >
        Profile
      </NavLink>
    </div>
  );
};

export default Navbar;
