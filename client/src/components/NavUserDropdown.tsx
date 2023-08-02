import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const NavUserDropdown = ({
  isUserNavShowing,
  setIsUserNavShowing,
}: {
  isUserNavShowing: boolean;
  setIsUserNavShowing: (boolean: boolean) => void;
}) => {
  const { authedUser, logout } = useAuth();

  const handleSignout = async () => {
    await logout();
  };

  return (
    <AnimatePresence>
      {isUserNavShowing && (
        <motion.div
          initial={{ y: "-50%", scaleY: 0, opacity: 0 }}
          animate={{ y: "0%", scaleY: 1, opacity: 1 }}
          exit={{ y: "-50%", scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute flex flex-col top-0.5 -right-3 z-30"
        >
          <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
          <div className="flex flex-col w-40 bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
            <span className="border-b border-borderprimary p-2">
              Signed in as{" "}
              <span className="font-bold">{authedUser?.username}</span>
            </span>
            <NavLink
              onClick={() => setIsUserNavShowing(false)}
              to={`/${authedUser?.username}`}
              className="p-2 no-underline text-primary hover:bg-highlightSecondary"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </NavLink>
            <NavLink
              onClick={() => setIsUserNavShowing(false)}
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
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-2"
              />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavUserDropdown;
