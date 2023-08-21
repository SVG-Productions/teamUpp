import React from "react";
import { NavLink, Navigate, Outlet, useParams } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboard, faList } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export const AppsLayout = () => {
  const { authedUser } = useAuth();
  const { username } = useParams();

  console.log(authedUser);

  const isAuthorizedUser = authedUser?.username === username;

  const activateSidebarLinks = ({ isActive }: { isActive: boolean }) => {
    const defaultStyle =
      " no-underline text-primary font-semibold rounded-md w-full p-2 hover:bg-secondary hover:no-underline";
    return isActive ? "bg-secondary" + defaultStyle : "" + defaultStyle;
  };

  if (!isAuthorizedUser) return <Navigate to={`/${username}`} />;

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${authedUser?.username}`, label: authedUser?.username },
          { to: "", label: "MyApps" },
        ]}
      />
      <div className="flex flex-col self-center w-full p-6 pb-0">
        <div id="topBar" className="flex flex-col justify-between items-center">
          <div className="flex w-full justify-between mt-4">
            <div className="flex items-center">
              <img
                className="w-7 h-7 rounded-full mr-3 sm:w-10 sm:h-10"
                width={40}
                height={40}
                alt={authedUser?.username}
                src={authedUser?.photo || authedUser?.avatar}
              />
              <h1 className="text-base sm:text-2xl">
                <NavLink
                  to={`/${authedUser?.username}`}
                  className="no-underline font-semibold text-primary hover:underline"
                >
                  <span className="text-slate-600">
                    ({authedUser?.username})
                  </span>
                </NavLink>
              </h1>
            </div>
            <NavLink
              to={`/${authedUser?.username}`}
              className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
            border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
            >
              Go to profile
            </NavLink>
          </div>
        </div>
        <div id="mainGroup" className="flex flex-col w-full h-full sm:flex-row">
          <div
            id="sidebar"
            className="flex flex-col py-6 sm:w-[180px] md:w-[240px]"
          >
            <div
              id="firstGroup"
              className="flex flex-col text-lg border-b border-borderprimary pb-2 sm:text-base"
            >
              <NavLink to="board" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faChalkboard}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>Board</span>
              </NavLink>
              <NavLink to="list" className={activateSidebarLinks}>
                <FontAwesomeIcon
                  icon={faList}
                  className="w-[16px] h-[16px] mr-2"
                />
                <span>List</span>
              </NavLink>
            </div>
          </div>
          <div id="main" className="w-full sm:ml-8 sm:pt-6 overflow-x-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
