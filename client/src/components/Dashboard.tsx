import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "./AuthedPageTitle";
import RecentActivity from "./RecentActivity";
import NullInfo from "./NullInfo";
import TeamsSideList from "./TeamsSideList";
import { UserType } from "../../type-definitions";
import React from "react";

const Dashboard = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const { authedUser } = useAuth();

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${authedUser?.username}`, label: authedUser?.username },
          { to: "", label: "Dashboard" },
        ]}
      />
      <div className="flex flex-col self-center w-full gap-4 p-6 pb-8 sm:flex-row sm:max-w-7xl sm:gap-10">
        <div className="flex flex-col gap-4 sm:w-3/4">
          <div className="">
            <h1 className="text-headingColor font-semibold pb-2 border-b border-borderprimary">
              Recent Activity
            </h1>
            {userData.recentActivity.length !== 0 &&
              userData.recentActivity.map((activity, index) => (
                <RecentActivity
                  activity={activity}
                  key={index + activity.username}
                />
              ))}
            {userData.recentActivity.length === 0 && (
              <div className="py-4 px-2">
                <NullInfo message="No recent activity." />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-8 sm:w-1/4 sm:mt-0">
          <TeamsSideList heading="Your teams" teams={userData.teams} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
