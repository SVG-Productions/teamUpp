import axios from "axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faNewspaper,
  faSun,
} from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const UserAppearanceSettingsPage = () => {
  const { setTheme, theme } = useAuth();

  const handleChooseTheme = async (e, userSelection) => {
    try {
      e.preventDefault();
      await axios.patch("/api/session/user", { theme: userSelection });
      setTheme(userSelection);
    } catch (error) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  return (
    <form
      className={`flex flex-col flex-grow self-center w-full rounded-sm max-w-6xl sm:max-h-full`}
    >
      <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
        Theme preferences
      </h1>
      <p className="mb-4">
        Choose how teamApp looks to you. Select a theme from below.
      </p>
      <div className="flex gap-4">
        <button
          className={`flex flex-col w-40 h-40 border-2 rounded-md bg-white ${
            theme === "light" ? "border-blue-600" : "border-borderprimary"
          }`}
          onClick={(e) => handleChooseTheme(e, "light")}
        >
          <div className="flex items-center justify-center w-full h-4/5 p-2">
            <FontAwesomeIcon
              icon={faBars}
              size="5x"
              className="text-slate-900"
            />
          </div>
          <div className="flex items-center gap-2 h-1/5 w-full bg-secondary rounded-b-[4px] pl-2">
            <FontAwesomeIcon icon={faSun} />
            <h3 className="text-sm text-start">Light Mode</h3>
          </div>
        </button>
        <button
          className={`flex flex-col w-40 h-40 border-2 rounded-md bg-black ${
            theme === "dark" ? "border-blue-600" : "border-borderprimary"
          }`}
          onClick={(e) => handleChooseTheme(e, "dark")}
        >
          <div className="flex items-center justify-center w-full h-4/5 p-2">
            <FontAwesomeIcon
              icon={faBars}
              size="5x"
              className="text-gray-200"
            />
          </div>
          <div className="flex items-center gap-2 h-1/5 w-full bg-secondary rounded-b-[4px] pl-2">
            <FontAwesomeIcon icon={faMoon} />
            <h3 className="text-sm text-start">Dark Mode</h3>
          </div>
        </button>
      </div>
    </form>
  );
};
