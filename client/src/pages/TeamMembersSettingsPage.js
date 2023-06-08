import { NavLink, useRevalidator, useRouteLoaderData } from "react-router-dom";
import InviteTeammateForm from "../components/InviteTeammateForm";
import NullInfo from "../components/NullInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import axios from "axios";

export const TeamMembersSettingsPage = () => {
  const { teamData } = useRouteLoaderData("teamSettings");
  const revalidator = useRevalidator();

  const [openMemberMenu, setOpenMemberMenu] = useState(null);

  const handleMemberMenuClick = (index) => {
    setOpenMemberMenu(index === openMemberMenu ? null : index);
  };

  const handleAcceptRequest = async (userId) => {
    try {
      await axios.patch(`/api/teams/${teamData.id}/teammates`, {
        userId,
        status: "member",
      });
      revalidator.revalidate();
      toast.success("Request successfully accepted!", basicToast);
    } catch (error) {
      toast.error("Error accepting request.", basicToast);
    }
  };

  const handleDenyRequest = async (userId) => {
    try {
      await axios.delete(`/api/teams/${teamData.id}/teammates`, {
        data: { userId },
      });
      revalidator.revalidate();
      toast.success("Request successfully denied.", basicToast);
    } catch (error) {
      toast.error("Error denying request.", basicToast);
    }
  };

  const handleRemoveInvite = async (userId) => {
    try {
      await axios.delete(`/api/teams/${teamData.id}/teammates`, {
        data: { userId },
      });
      revalidator.revalidate();
      toast.success("Invite successfully removed.", basicToast);
    } catch (error) {
      toast.error("Error removing invite.", basicToast);
    }
  };

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
  rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Members
        </h1>
        <ul className="grid w-full grid-cols-1 gap-y-1 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.teammates.map((tm, index) => (
            <li
              key={tm.id}
              className="flex w-full items-center px-1 hover:bg-highlight sm:w-[80%]"
            >
              <NavLink
                to={`/${tm.username}`}
                className="w-full flex items-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
              >
                <img
                  className="rounded-full mr-2"
                  src={tm.photo || tm.avatar}
                  width={28}
                  height={28}
                  alt={tm.username}
                />
                <span className="truncate">{tm.username}</span>
              </NavLink>
              <span className="text-xs text-gray-400 ml-auto">{tm.status}</span>
              {tm.status !== "owner" && (
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    size="lg"
                    onClick={() => handleMemberMenuClick(index)}
                    className="ml-4"
                  />
                  {openMemberMenu === index && (
                    <div className="absolute flex flex-col top-4 -right-6 z-30">
                      <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent" />
                      <ul className="flex flex-col w-40 bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
                        {tm.status === "admin" && (
                          <li className="p-2 cursor-pointer no-underline text-primary hover:bg-highlightSecondary">
                            Demote to member
                          </li>
                        )}
                        {tm.status === "member" && (
                          <>
                            <li className="p-2 cursor-pointer no-underline text-primary hover:bg-highlightSecondary">
                              Promote to admin
                            </li>
                            <li className="p-2 cursor-pointer no-underline text-primary hover:bg-highlightSecondary">
                              Remove from team
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Requests to join
        </h1>
        <ul className="grid w-full grid-cols-1 gap-y-1 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.requested.length ? (
            teamData.requested.map((req) => (
              <li
                key={req.id}
                className="flex w-full items-center px-1 hover:bg-highlight sm:w-[80%]"
              >
                <NavLink
                  to={`/${req.username}`}
                  className="w-full flex items-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
                >
                  <img
                    className="rounded-full mr-2"
                    src={req.photo || req.avatar}
                    width={28}
                    height={28}
                    alt={req.username}
                  />
                  <span className="truncate">{req.username}</span>
                </NavLink>
                <div className="flex gap-2">
                  <FontAwesomeIcon
                    size="lg"
                    className="text-iconPrimary cursor-pointer hover:text-green-500"
                    icon={faSquareCheck}
                    onClick={() => handleAcceptRequest(req.id)}
                  />
                  <FontAwesomeIcon
                    size="lg"
                    className="text-iconPrimary cursor-pointer hover:text-red-500"
                    icon={faSquareXmark}
                    onClick={() => handleDenyRequest(req.id)}
                  />
                </div>
              </li>
            ))
          ) : (
            <NullInfo />
          )}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Invites outgoing
        </h1>
        <h3 className="text-headingColor">
          Invite a friend to join {teamData.name}!
        </h3>
        <InviteTeammateForm />
        {teamData.invited.length > 0 && (
          <div>
            <h3 className="text-headingColor">Invited members:</h3>
            <ul className="grid w-full grid-cols-1 gap-y-1 my-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamData.invited.map((inv) => (
                <li
                  key={inv.id}
                  className="flex w-full items-center px-1 hover:bg-highlight sm:w-[80%]"
                >
                  <NavLink
                    to={`/${inv.username}`}
                    className="w-full flex items-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
                  >
                    <img
                      className="rounded-full mr-2"
                      src={inv.photo || inv.avatar}
                      width={28}
                      height={28}
                      alt={inv.username}
                    />
                    <span className="truncate">{inv.username}</span>
                  </NavLink>
                  <button
                    className="text-xs min-w-fit h-3/5 text-primary px-1 bg-secondary rounded-md
                    border border-slate-400 hover:border-slate-600 hover:bg-highlight"
                    onClick={() => handleRemoveInvite(inv.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
