import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { InviteType, UserType } from "../../type-definitions";
import { useAuth } from "../context/AuthContext";
import { basicToast } from "../utils/toastOptions";
import NullInfo from "./NullInfo";

const NavNotifsDropdown = ({
  isNotifsNavShowing,
}: {
  isNotifsNavShowing: boolean;
}) => {
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
    <AnimatePresence>
      {isNotifsNavShowing && (
        <motion.div
          initial={{ y: "-50%", scaleY: 0, opacity: 0 }}
          animate={{ y: "0%", scaleY: 1, opacity: 1 }}
          exit={{ y: "-50%", scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute flex flex-col top-2 -right-[23px]"
        >
          <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
          <div className="flex flex-col w-72 bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
            <h1 className="text-headingColor text-base p-2 font-semibold border-b border-borderprimary">
              Notifications
            </h1>
            {userData.invites.length ? (
              userData.invites.map((team, index) => (
                <li
                  className="flex flex-col gap-1 p-2.5 rounded-sm"
                  key={`${team.name}-${index}`}
                >
                  <span className="font-semibold">
                    Invite to join {team.name}!
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-1/2 p-1.5 text-sm bg-buttonPrimary hover:bg-buttonSecondary text-white 
        font-bold rounded-md focus:shadow-outline"
                      onClick={() => handleAcceptInvite(team)}
                    >
                      Accept
                    </button>
                    <button
                      className="w-1/2 p-1.5 text-sm text-primary font-bold bg-secondary rounded-md
                  border border-slate-400 hover:border-slate-600 hover:bg-highlight"
                      onClick={() => handleDenyInvite(team)}
                    >
                      Deny
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div className="p-2">
                <NullInfo message="You have no notifications." />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavNotifsDropdown;
