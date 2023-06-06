import React from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faPaintBrush,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export const UserSettingsLayout = () => {
  const { authedUser } = useAuth();
  const { username } = useParams();
  const { userData } = useRouteLoaderData("userSettings");
  const isAuthorizedUser = authedUser.username === username;

  const activateSidebarLinks = ({ isActive }) => {
    const defaultStyle =
      " no-underline text-primary font-semibold rounded-md w-full p-2 hover:bg-secondary";
    return isActive ? "bg-secondary" + defaultStyle : "" + defaultStyle;
  };

  if (!isAuthorizedUser) return <Navigate to={`/${username}`} />;

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${userData.username}`, label: userData.username },
          { label: "Settings" },
        ]}
      />
      <div className="flex flex-col self-center w-full p-6 pb-8 sm:max-w-7xl">
        <div id="topBar" className="flex justify-between items-center sm:mt-4">
          <div className="flex items-center">
            <img
              className="w-7 h-7 rounded-full mr-3 sm:w-10 sm:h-10"
              width={40}
              height={40}
              alt={userData.username}
              src={authedUser.photo || authedUser.avatar}
            />
            <h1 className="text-base sm:text-2xl">
              <NavLink
                to={`/${userData.username}`}
                className="no-underline font-semibold text-primary hover:underline"
              >
                {userData.firstName}
                <span className="text-slate-600"> ({userData.username})</span>
              </NavLink>
            </h1>
          </div>
          <NavLink
            to={`/${userData.username}`}
            className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
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
              className="flex flex-col text-lg border-b border-borderprimary pb-2 sm:text-base"
            >
              <NavLink to="profile" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Public profile</span>
              </NavLink>
              <NavLink to="photo" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faImage}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Profile photo</span>
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
  const userData = userResponse.data;
  return { userData };
};
