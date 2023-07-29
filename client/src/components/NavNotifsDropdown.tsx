import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { InviteType, UserType } from "../../type-definitions";
import { useAuth } from "../context/AuthContext";
import { basicToast } from "../utils/toastOptions";
import NullInfo from "./NullInfo";

const NavNotifsDropdown = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const revalidator = useRevalidator();
  const { authedUser } = useAuth();

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
    <div className="absolute flex flex-col top-2 -right-[23px] z-30">
      <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
      <div className="flex flex-col w-40 bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
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
      </div>
    </div>
  );
};

export default NavNotifsDropdown;
