import React from "react";
import { NavLink } from "react-router-dom";

const UserSettingsLayout = ({ children }) => {
  return (
    <div className="flex sm:flex-col">
      <div id="topBar" className="flex justify-between">
        <div className="flex items-center">
          <div></div>
          <h1>
            <NavLink></NavLink>
          </h1>
        </div>
        <NavLink>Go to profile</NavLink>
      </div>
      <div id="mainGroup" className="flex">
        <div id="sidebar" className="flex flex-col pr-4">
          <NavLink>Public profile</NavLink>
          <NavLink>Account</NavLink>
          <NavLink>Appearance</NavLink>
        </div>
        <div id="main">{children}</div>
      </div>
    </div>
  );
};

export default UserSettingsLayout;
