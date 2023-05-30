import axios from "axios";
import React from "react";
import useTheme from "../hooks/useTheme";
import { useRouteLoaderData } from "react-router-dom";

export const AppearanceSettingsPage = () => {
  const [_, setTheme] = useTheme();
  const { userData } = useRouteLoaderData("userSettings");

  const handleChooseTheme = async (e, userSelection) => {
    e.preventDefault();
    await axios.patch("/api/session/user", { theme: userSelection });
    setTheme(userSelection);
    userData.theme = userSelection;
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
          className={`h-10 w-10 border-2 rounded-full bg-white ${
            userData.theme === "light" && "border-blue-600"
          }`}
          onClick={(e) => handleChooseTheme(e, "light")}
        />
        <button
          className={`h-10 w-10 border rounded-full bg-gray-700 ${
            userData.theme === "dark" && "border-blue-600"
          }`}
          onClick={(e) => handleChooseTheme(e, "dark")}
        />
      </div>
    </form>
  );
};
