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
        <div className="sm:hidden">
          {isTeammate && <InviteTeammateForm />}
          <div className="flex-col pb-6">
            <h2 className="relative font-bold text-slate-400">TEAM CREDO</h2>
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
          <div className="hidden sm:block">
            {isTeammate && <InviteTeammateForm />}
          </div>
          <div className="hidden flex-col sm:flex sm:pb-8 sm:p-2 sm:pt-0">
            <h3 className="relative font-bold text-slate-400">TEAM CREDO</h3>
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
