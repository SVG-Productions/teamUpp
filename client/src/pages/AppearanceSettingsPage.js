import axios from "axios";
import React from "react";
import { useTheme } from "../context/ThemeContext";

export const AppearanceSettingsPage = () => {
  const { setTheme } = useTheme();

  const handleChooseTheme = async (e, userSelection) => {
    e.preventDefault();
    await axios.patch("/api/session/user", { theme: userSelection });
    setTheme(userSelection);
  };

  return (
    <form
      className={`flex flex-col flex-grow self-center w-full rounded-sm max-w-6xl sm:max-h-full`}
    >
      <h1 className="text-slate-400 font-semibold pb-2 mb-4 border-b border-slate-300">
        Theme preferences
      </h1>
      <p>Choose how teamApp looks to you. Select a theme from below.</p>
      <button onClick={(e) => handleChooseTheme(e, "light")}>Light</button>
      <button onClick={(e) => handleChooseTheme(e, "dark")}>Dark</button>
    </form>
  );
};
