import { useLoaderData, useRevalidator } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "./AuthedPageTitle";
import RecentActivity from "./RecentActivity";
import NullInfo from "./NullInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import TeamsSideList from "./TeamsSideList";
import { InviteType, UserType } from "../../type-definitions";
import React from "react";

const Dashboard = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const { authedUser } = useAuth();
  const revalidator = useRevalidator();

  const handleAcceptInvite = async (team: InviteType) => {
    try {
      const response = await axios.patch(`/api/teams/${team.id}/teammates`, {
        userId: authedUser?.id,
        status: "member",
      });
      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const handleDenyInvite = async (team: InviteType) => {
    try {
      const response = await axios.delete(`/api/teams/${team.id}/teammates`, {
        data: { userId: authedUser?.id },
      });
      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

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
            <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
              Notifications
            </h1>
            {userData.invites.length ? (
              userData.invites.map((team, index) => (
                <li
                  className="flex p-2.5 rounded-sm justify-between hover:bg-highlight"
                  key={`${team.name}-${index}`}
                >
                  <span className="font-semibold">
                    Invite to join {team.name}!
                  </span>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      size="xl"
                      className="text-iconPrimary hover:text-green-500 cursor-pointer"
                      onClick={() => handleAcceptInvite(team)}
                    />
                    <FontAwesomeIcon
                      icon={faXmarkSquare}
                      size="xl"
                      className="text-iconPrimary hover:text-red-500 cursor-pointer"
                      onClick={() => handleDenyInvite(team)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="px-2">
                <NullInfo message="No notifications." />
              </div>
            )}
          </div>
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
