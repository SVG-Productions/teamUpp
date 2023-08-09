import React, { useState, useRef } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import NavUserDropdown from "./NavUserDropdown";
import useOnClickOutside from "../hooks/useOnClickOutside";
import LogoSmall from "./LogoSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NavNotifsDropdown from "./NavNotifsDropdown";
import { UserType } from "../../type-definitions";

const Navbar = () => {
  const { authedUser } = useAuth();
  const { userData } = useLoaderData() as { userData: UserType };
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
        <motion.div whileHover={{ scale: 1.1 }}>
          <NavLink
            to={`/${authedUser?.username}/apps`}
            className="text-primary no-underline text-sm font-semibold hover:text-secondary hover:no-underline sm:text-base"
          >
            MyApps
          </NavLink>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <NavLink
            to="/teams"
            className="text-primary no-underline text-sm font-semibold hover:text-secondary hover:no-underline sm:text-base"
          >
            Teams
          </NavLink>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <NavLink
            to={`/${authedUser?.username}/favorites`}
            className="text-primary text-sm font-semibold hover:text-secondary hover:no-underline sm:text-base"
          >
            Favorites
          </NavLink>
        </motion.div>
      </div>
      <div className="flex gap-4 items-center leading-none sm:gap-6">
        <div ref={notifsNavRef}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative"
            onClick={() => setIsNotifsNavShowing(!isNotifsNavShowing)}
          >
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl text-primary hover:text-secondary"
            />
            {userData.invites.length > 0 && (
              <div className="flex justify-center items-center absolute w-2.5 h-2.5 rounded-full bg-red-600 top-0 -right-1 text-white text-[8px] font-bold">
                {userData.invites.length}
              </div>
            )}
          </motion.button>
          <div className="relative">
            <NavNotifsDropdown isNotifsNavShowing={isNotifsNavShowing} />
          </div>
        </div>
        <div ref={userNavRef}>
          <motion.button
            whileHover={{ scale: 1.1, opacity: 0.75 }}
            className="flex items-center gap-2"
            onClick={() => setIsUserNavShowing(!isUserNavShowing)}
          >
            <img
              className="rounded-full w-10 h-10"
              src={authedUser?.photo || authedUser?.avatar}
              alt={authedUser?.username}
              width={40}
              height={40}
            />
          </motion.button>
          <div className="relative">
            <NavUserDropdown
              isUserNavShowing={isUserNavShowing}
              setIsUserNavShowing={setIsUserNavShowing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
