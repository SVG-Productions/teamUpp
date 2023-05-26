import React from "react";

export const AppearanceSettingsPage = () => {
  return (
    <form
      className={`flex flex-col flex-grow self-center w-full 
rounded-sm max-w-6xl sm:max-h-full`}
    >
      <h1 className="text-slate-400 font-semibold pb-2 mb-4 border-b border-slate-300">
        Theme preferences
      </h1>
      <p>Choose how teamApp looks to you. Select a theme from below.</p>
    </form>
  );
};
