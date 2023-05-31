import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavDropdownList from "./NavDropdownList";
import useOnClickOutside from "../hooks/useOnClickOutside";
import LogoSmall from "./LogoSmall";

const Navbar = () => {
  const { authedUser } = useAuth();
  const [isListShowing, setIsListShowing] = useState(false);
  const navButtonRef = useRef();
  useOnClickOutside(navButtonRef, () => setIsListShowing(false));

  return (
    <div className="sticky top-0 z-30 p-4 w-full flex items-center h-16 justify-between bg-[#20222c] shadow-[0_1px_3px_rgb(0,0,0,0.2)]">
      <div className="flex gap-4 sm:gap-10 items-center">
        <NavLink to="/" className="no-underline">
          <LogoSmall />
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive
              ? "text-[#cbd5e1] text-sm sm:text-base underline underline-offset-4"
              : "text-[#cbd5e1] no-underline text-sm sm:text-base"
          }
        >
          Teams
        </NavLink>
        <NavLink
          to={`/${authedUser?.username}/favorites`}
          className={({ isActive }) =>
            isActive
              ? "text-[#cbd5e1] text-sm sm:text-base underline underline-offset-4"
              : "text-[#cbd5e1] no-underline text-sm sm:text-base"
          }
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
            <div className="text-[#cbd5e1]">&#9650;</div>
          ) : (
            <div className="text-[#cbd5e1]">&#9660;</div>
          )}
          <img
            className="rounded-full"
            src={authedUser.photo || authedUser.avatar}
            width={40}
            height={40}
            alt={authedUser.username}
          />
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
