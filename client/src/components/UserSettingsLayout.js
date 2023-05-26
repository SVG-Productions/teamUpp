import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "./AuthedPageTitle";

const UserSettingsLayout = ({ children }) => {
  const { user } = useLoaderData();
  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${user.username}`, label: user.username },
          { label: "Settings" },
        ]}
      />
      <div className="flex self-center w-full sm:flex-col sm:max-w-7xl sm:p-2 sm:pb-8">
        <div id="topBar" className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div
              className=" flex items-center justify-center bg-slate-900 rounded-full w-10 h-10 
            text-xs font-semibold text-white mr-3"
            >
              UI
            </div>
            <h1>
              <NavLink
                to={`/${user.username}`}
                className="no-underline font-semibold text-slate-900 hover:underline"
              >
                {user.firstName}
                <span className="text-slate-600"> ({user.username})</span>
              </NavLink>
            </h1>
          </div>
          <NavLink
            to={`/${user.username}`}
            className="no-underline font-semibold px-2 rounded-md text-slate-600
          border-2 border-slate-400 hover:border-slate-600 hover:bg-slate-200"
          >
            Go to profile
          </NavLink>
        </div>
        <div id="mainGroup" className="flex w-full">
          <div
            id="sidebar"
            className="flex flex-col py-6 sm:w-[180px] md:w-[240px]"
          >
            <div
              id="firstGroup"
              className="flex flex-col border-b border-slate-300 pb-2"
            >
              <NavLink className="no-underline text-slate-900 font-semibold rounded-md w-full px-1 py-0.5 hover:bg-slate-200">
                Public profile
              </NavLink>
              <NavLink className="no-underline text-slate-900 font-semibold rounded-md w-full px-1 py-0.5 hover:bg-slate-200">
                Account
              </NavLink>
              <NavLink className="no-underline text-slate-900 font-semibold rounded-md w-full px-1 py-0.5 hover:bg-slate-200">
                Appearance
              </NavLink>
            </div>
          </div>
          <div id="main" className="w-full sm:pl-4 sm:pt-6 md:pl-8 lg:pl-16">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettingsLayout;
