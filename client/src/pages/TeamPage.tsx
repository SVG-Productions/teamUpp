import { Params, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import parse from "html-react-parser";
import AuthedPageTitle from "../components/AuthedPageTitle";
import NullInfo from "../components/NullInfo";
import TeamListings from "../components/TeamListings";
import Teammates from "../components/Teammates";
import BlurredListings from "../components/BlurredListings";
import CreateListingModal from "../components/CreateListingModal";
import { TeamType } from "../../type-definitions";

export const TeamPage = () => {
  const [isCreateListingModalShowing, setIsCreateListingModalShowing] =
    useState(false);

  const { teamData } = useLoaderData() as { teamData: TeamType };
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { name, description } = teamData;
  const isAdmin = teamData.admins.some((a) => a.id === authedUser?.id);
  const isTeammate = teamData.teammates.some((tm) => tm.id === authedUser?.id);

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/teams`, label: "Teams" },
          { to: "", label: name },
        ]}
      />
      {isCreateListingModalShowing && (
        <CreateListingModal handleModal={setIsCreateListingModalShowing} />
      )}
      <div className="flex flex-col self-center w-full p-6 pb-8 sm:flex-row sm:max-w-7xl sm:gap-8">
        <div className="flex flex-col sm:w-1/4">
          <h1 className="text-headingColor font-semibold pb-2 mb-4">
            {teamData.name}
          </h1>
          <img
            src={teamData.photo || teamData.avatar}
            className="w-48 h-48 rounded-full self-center mb-4 sm:mb-8"
            width={192}
            height={192}
            alt={teamData.name}
          />
          {isAdmin && (
            <button
              className="w-full font-semibold text-sm p-2 mb-4 bg-primary rounded-md text-primary
      border border-slate-400 hover:border-slate-600 hover:bg-highlight"
              onClick={() => navigate("settings")}
            >
              Team settings
            </button>
          )}
          <div className="flex-col sm:flex">
            <h2 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary text-2xl sm:text-xl">
              Team credo
            </h2>
            <div className="px-2 py-1 sm:px-0">
              {description ? parse(description) : <NullInfo />}
            </div>
          </div>
        </div>
        <div className="relative my-8 sm:my-0 sm:w-7/12">
          {isTeammate ? (
            <TeamListings handleModal={setIsCreateListingModalShowing} />
          ) : (
            <BlurredListings />
          )}
        </div>
        <div className="sm:w-1/6 sm:pl-2">
          <Teammates />
        </div>
      </div>
    </>
  );
};

export const teamLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const { teamId } = params;
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const teamListingsParams = {
    sort: searchParams.get("sort"),
    search: searchParams.get("search"),
    page: searchParams.get("page"),
  };
  const [teamResponse, userResponse] = await Promise.all([
    axios.get(`/api/teams/${teamId}`, { params: teamListingsParams }),
    axios.get("/api/users/user"),
  ]);
  const userData = userResponse.data;
  const teamData = teamResponse.data;

  return {
    userData,
    teamData,
  };
};
