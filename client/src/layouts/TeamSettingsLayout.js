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
  faGear,
  faImage,
  faShieldHalved,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export const TeamSettingsLayout = () => {
  const { authedUser } = useAuth();
  const { teamId } = useParams();
  const { teamData } = useRouteLoaderData("teamSettings");

  const isAdmin = teamData.admins.some((a) => a.id === authedUser.id);

  const activateSidebarLinks = ({ isActive }) => {
    const defaultStyle =
      " no-underline text-primary font-semibold rounded-md w-full p-2 hover:bg-secondary";
    return isActive ? "bg-secondary" + defaultStyle : "" + defaultStyle;
  };

  if (!isAdmin) return <Navigate to={`/teams/${teamId}`} />;

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: "/teams", label: "Teams" },
          { to: `/teams/${teamData.id}`, label: teamData.name },
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
              alt={teamData.name}
              src={teamData.photo || teamData.avatar}
            />
            <h1 className="text-base sm:text-2xl">
              <NavLink
                to={`/teams/${teamData.id}`}
                className="no-underline font-semibold text-primary hover:underline"
              >
                {teamData.name}
                <span className="text-slate-600 capitalize">
                  {" "}
                  ({teamData.jobField})
                </span>
              </NavLink>
            </h1>
          </div>
          <NavLink
            to={`/teams/${teamData.id}`}
            className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
          >
            View team
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
                  icon={faGear}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>General</span>
              </NavLink>
              <NavLink to="photo" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faImage}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Team photo</span>
              </NavLink>
            </div>
            <div
              id="secondGroup"
              className="flex flex-col text-lg border-b border-borderprimary pb-2 sm:text-base"
            >
              <NavLink to="privacy" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Privacy</span>
              </NavLink>
              <NavLink to="members" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faUsers}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Manage members</span>
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

export const teamSettingsLoader = async ({ request, params }) => {
  const { teamId } = params;

  const teamResponse = await axios.get(`/api/teams/${teamId}`);
  const teamData = teamResponse.data;
  return { teamData };
};
