import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavDropdownList from "./NavDropdownList";
import useOnClickOutside from "../hooks/useOnClickOutside";
import LogoSmall from "./LogoSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { authedUser } = useAuth();
  const [isUserNavShowing, setIsUserNavShowing] = useState(false);
  const [isNotifsNavShowing, setIsNotifsNavShowing] = useState(false);
  const userNavRef = useRef<HTMLInputElement>(null);
  const notifsNavRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(userNavRef, () => setIsUserNavShowing(false));
  useOnClickOutside(notifsNavRef, () => setIsNotifsNavShowing(false));

  return (
    <div className="sticky top-0 z-30 p-4 w-full flex items-center h-16 justify-between bg-secondary shadow-[0_1px_3px_rgb(0,0,0,0.2)]">
      <div className="flex gap-4 items-center sm:gap-8">
        <NavLink to="/" className="hover:no-underline">
          <LogoSmall />
        </NavLink>
        <NavLink
          to={`/${authedUser?.username}/apps`}
          className="text-primary no-underline text-sm font-semibold hover:text-secondary sm:text-base"
        >
          MyApps
        </NavLink>
        <NavLink
          to="/teams"
          className="text-primary no-underline text-sm font-semibold hover:text-secondary sm:text-base"
        >
          Teams
        </NavLink>
        <NavLink
          to={`/${authedUser?.username}/favorites`}
          className="text-primary no-underline text-sm font-semibold hover:text-secondary sm:text-base"
        >
          Favorites
        </NavLink>
      </div>
      <div className="flex gap-4 items-center leading-none">
        <div ref={notifsNavRef}>
          <button onClick={() => setIsNotifsNavShowing(!isNotifsNavShowing)}>
            <FontAwesomeIcon
              icon={faBell}
              className="text-xl text-primary hover:text-secondary"
            />
          </button>
          <div className="relative">
            {isNotifsNavShowing && <div className="absolute top-0">HI</div>}
          </div>
        </div>
        <div ref={userNavRef}>
          <button
            className="flex items-center gap-2"
            onClick={() => setIsUserNavShowing(isUserNavShowing ? false : true)}
          >
            <img
              className="rounded-full w-9 h-9"
              src={authedUser?.photo || authedUser?.avatar}
              alt={authedUser?.username}
              width={36}
              height={36}
            />
            <FontAwesomeIcon icon={faCaretDown} size="xs" />
          </button>
          <div className="relative">
            {isUserNavShowing && (
              <NavDropdownList setIsUserNavShowing={setIsUserNavShowing} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
