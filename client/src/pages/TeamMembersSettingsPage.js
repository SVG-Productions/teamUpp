import { NavLink, useRevalidator, useRouteLoaderData } from "react-router-dom";
import InviteTeammateForm from "../components/InviteTeammateForm";
import NullInfo from "../components/NullInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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

  const [openRequestMenu, setOpenRequestMenu] = useState(null);
  const handleRequestMenuClick = (index) => {
    setOpenRequestMenu(index === openRequestMenu ? null : index);
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
          {teamData.teammates.map((i) => (
            <li key={i.id} className="w-[80%] px-1 hover:bg-highlight">
              <NavLink
                to={`/${i.username}`}
                className="w-full flex self-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
              >
                <img
                  className="rounded-full mr-2"
                  src={i.photo || i.avatar}
                  width={28}
                  height={28}
                  alt={i.username}
                />
                <span className="truncate">{i.username}</span>
              </NavLink>
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
            teamData.requested.map((r, index) => (
              <li
                key={r.id}
                className="flex w-[80%] items-center px-1 hover:bg-highlight"
              >
                <NavLink
                  to={`/${r.username}`}
                  className="w-full flex items-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
                >
                  <img
                    className="rounded-full mr-2"
                    src={r.photo || r.avatar}
                    width={28}
                    height={28}
                    alt={r.username}
                  />
                  <span className="truncate">{r.username}</span>
                </NavLink>
                <div className="flex gap-2">
                  <FontAwesomeIcon
                    size="lg"
                    className="text-iconPrimary cursor-pointer hover:text-green-500"
                    icon={faSquareCheck}
                    onClick={() => handleAcceptRequest(r.id)}
                  />
                  <FontAwesomeIcon
                    size="lg"
                    className="text-iconPrimary cursor-pointer hover:text-red-500"
                    icon={faSquareXmark}
                    onClick={() => handleDenyRequest(r.id)}
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
        {teamData.invited.length && (
          <div>
            <h3 className="text-headingColor">Invited members:</h3>
            <ul className="grid w-full grid-cols-1 gap-y-1 my-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamData.invited.map((i) => (
                <li key={i.id} className="w-[80%] px-1 hover:bg-highlight">
                  <NavLink
                    to={`/${i.username}`}
                    className="w-full flex self-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
                  >
                    <img
                      className="rounded-full mr-2"
                      src={i.photo || i.avatar}
                      width={28}
                      height={28}
                      alt={i.username}
                    />
                    <span className="truncate">{i.username}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
