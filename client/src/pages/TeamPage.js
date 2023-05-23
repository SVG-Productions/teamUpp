import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import NullInfo from "../components/NullInfo";
import PencilButton from "../components/PencilButton";
import TeamListings from "../components/TeamListings";
import InviteTeammateForm from "../components/InviteTeammateForm";
import TeammatesAndRequests from "../components/TeammatesAndRequests";
import BlurredListings from "../components/BlurredListings";
import { useState } from "react";
import CreateListingModal from "../components/CreateListingModal";

export const TeamPage = () => {
  const [isCreateListingModalShowing, setIsCreateListingModalShowing] =
    useState(false);

  const { team, teammates, authorizedTeammates } = useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { id, name, description } = team;
  const isAuthorized = authorizedTeammates.includes(authedUser.id);
  const isTeammate = teammates.some((tm) => tm.id === authedUser.id);

  return (
    <>
      <AuthedPageTitle
        links={[{ to: `/teams`, label: "Teams" }, { label: name }]}
      >
        {isAuthorized && (
          <PencilButton
            onClick={() => navigate(`/teams/${id}/settings`)}
            fill="black"
            styling="h-10 w-10 bg-slate-100"
          />
        )}
      </AuthedPageTitle>
      {isCreateListingModalShowing && (
        <CreateListingModal handleModal={setIsCreateListingModalShowing} />
      )}
      <div className="flex flex-col w-full sm:flex-row p-6 sm:gap-12 sm:px-12 sm:pt-8">
        <div className="sm:hidden">{isTeammate && <InviteTeammateForm />}</div>
        <div className="relative sm:w-2/3">
          {isTeammate ? (
            <TeamListings handleModal={setIsCreateListingModalShowing} />
          ) : (
            <BlurredListings />
          )}
        </div>
        <div className="flex flex-col sm:w-1/3">
          <div className="hidden sm:block">
            {isTeammate && <InviteTeammateForm />}
          </div>
          <div className="flex flex-col pb-6 sm:pb-8 sm:p-2 sm:pt-0">
            <p className="relative font-bold text-slate-400">TEAM CREDO</p>
            <div className="h-full p-2.5">
              {description ? description : <NullInfo />}
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
  const { favorites } = userResponse.data;
  const { team, teammates, listings } = teamResponse.data;
  const filteredTeammates = teammates.filter(
    (tm) => tm.status !== "invited" && tm.status !== "requested"
  );
  const requested = teammates.filter((tm) => tm.status === "requested");
  const authorizedTeammates = teammates
    .filter((tm) => tm.status === "owner" || tm.status === "admin")
    .reduce((acc, tm) => {
      acc.push(tm.id);
      return acc;
    }, []);

  return {
    team,
    teammates: filteredTeammates,
    requested,
    authorizedTeammates,
    favorites,
    listings,
  };
};
