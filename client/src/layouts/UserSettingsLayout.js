import React from "react";
import { NavLink, Outlet, useRouteLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

export const UserSettingsLayout = () => {
  const { user } = useRouteLoaderData("userSettings");

  const activateSidebarLinks = ({ isActive }) => {
    const defaultStyle =
      " no-underline text-slate-900 font-semibold rounded-md w-full px-1 py-0.5 hover:bg-slate-300";
    return isActive ? "bg-slate-200" + defaultStyle : "bg-white" + defaultStyle;
  };
  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${user.username}`, label: user.username },
          { label: "Settings" },
        ]}
      />
      <div className="flex flex-col self-center w-full p-6 pb-8 sm:max-w-7xl sm:p-2 sm:pb-8">
        <div id="topBar" className="flex justify-between items-center sm:mt-4">
          <div className="flex items-center">
            <img
              className="w-7 h-7 rounded-full mr-3 sm:w-10 sm:h-10"
              width={40}
              height={40}
              alt={user.username}
              src={user.photo || user.avatar}
            />
            <h1 className="text-base sm:text-2xl">
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
            className="no-underline font-semibold text-sm px-2 rounded-md text-slate-600
          border-2 border-slate-400 hover:border-slate-600 hover:bg-slate-200 sm:text-base"
          >
            Go to profile
          </NavLink>
        </div>
        <div id="mainGroup" className="flex flex-col w-full sm:flex-row">
          <div
            id="sidebar"
            className="flex flex-col py-6 sm:w-[180px] md:w-[240px]"
          >
            <div
              id="firstGroup"
              className="flex flex-col text-lg border-b border-slate-300 pb-2 sm:text-base"
            >
              <NavLink to="profile" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Public profile</span>
              </NavLink>
              <NavLink to="account" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faGear}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Account</span>
              </NavLink>
              <NavLink to="appearance" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faPaintBrush}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Appearance</span>
              </NavLink>
            </div>
          </div>
          <div id="main" className="w-full sm:pl-4 sm:pt-6 md:pl-8 lg:pl-16">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export const userSettingsLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const { user, jobFields, teams } = userResponse.data;
  const ownedTeams = teams.filter((t) => t.status === "owner");
  const flattenedJobFields = jobFields.map((jf) => jf.jobField);
  return { user, jobFields: flattenedJobFields, ownedTeams };
};
