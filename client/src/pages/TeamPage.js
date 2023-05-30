import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import parse from "html-react-parser";
import AuthedPageTitle from "../components/AuthedPageTitle";
import NullInfo from "../components/NullInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import TeamListings from "../components/TeamListings";
import InviteTeammateForm from "../components/InviteTeammateForm";
import TeammatesAndRequests from "../components/TeammatesAndRequests";
import BlurredListings from "../components/BlurredListings";
import CreateListingModal from "../components/CreateListingModal";

export const TeamPage = () => {
  const [isCreateListingModalShowing, setIsCreateListingModalShowing] =
    useState(false);

  const { teamData } = useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { id, name, description } = teamData;
  const isAuthorized = teamData.admins.some((a) => a.id === authedUser.id);
  const isTeammate = teamData.teammates.some((tm) => tm.id === authedUser.id);

  return (
    <>
      <AuthedPageTitle
        links={[{ to: `/teams`, label: "Teams" }, { label: name }]}
      >
        {isAuthorized && (
          <FontAwesomeIcon
            icon={faPencil}
            size="lg"
            className="cursor-pointer rounded-full p-2 bg-white hover:bg-slate-400"
            onClick={() => navigate(`/teams/${id}/settings`)}
          />
        )}
      </AuthedPageTitle>
      {isCreateListingModalShowing && (
        <CreateListingModal handleModal={setIsCreateListingModalShowing} />
      )}
      <div className="flex flex-col w-full sm:flex-row p-6 sm:gap-12 sm:px-12 sm:pt-8">
        <div className="flex flex-col sm:hidden">
          <img
            src={teamData.photo || teamData.avatar}
            className="w-40 h-40 mb-8 rounded-full self-center"
            width={160}
            height={160}
            alt={teamData.name}
          />
          {isTeammate && <InviteTeammateForm />}
          <div className="flex-col pb-6">
            <h2 className="relative font-bold text-headingColor">TEAM CREDO</h2>
            <div className="px-2 py-1 border-l-2">
              {description ? parse(description) : <NullInfo />}
            </div>
          </div>
        </div>
        <div className="relative sm:w-2/3">
          {isTeammate ? (
            <TeamListings handleModal={setIsCreateListingModalShowing} />
          ) : (
            <BlurredListings />
          )}
        </div>
        <div className="flex flex-col sm:w-1/3">
          <div className="hidden sm:flex sm:flex-col">
            {isTeammate && <InviteTeammateForm />}
            <img
              src={teamData.photo || teamData.avatar}
              className="w-40 h-40 mb-8 ml-8 rounded-full self-center"
              width={160}
              height={160}
              alt={teamData.name}
            />
          </div>
          <div className="hidden flex-col sm:flex sm:pb-8 sm:p-2 sm:pt-0">
            <h3 className="relative font-bold text-headingColor">TEAM CREDO</h3>
            <div className="px-2 py-1 border-l-2">
              {description ? parse(description) : <NullInfo />}
            </div>
          </div>
          <div className="sm:pl-2">
            <TeammatesAndRequests />
          </div>
        </div>
      </div>
    </>
  );
};

export const teamLoader = async ({ request, params }) => {
  const { teamId } = params;
  const [teamResponse, userResponse] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get("/api/session/user"),
  ]);
  const userData = userResponse.data;
  const teamData = teamResponse.data;

  return {
    userData,
    teamData,
  };
};
