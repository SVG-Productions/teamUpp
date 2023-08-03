import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  NavLink,
  Navigate,
  Params,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ListingDetails from "../components/ListingDetails";
import FavoriteButton from "../components/FavoriteButton";
import ListingTabs from "../components/ListingTabs";
import ListingExperiences from "../components/ListingExperiences";
import ExperienceDetails from "../components/ExperienceDetails";
import ListingComments from "../components/ListingComments";
import CreateExperienceModal from "../components/CreateExperienceModal";
import DeleteListingModal from "../components/DeleteListingModal";
import DeleteExperienceModal from "../components/DeleteExperienceModal";
import { formatSalary } from "../utils/formatSalary";
import { ListingType, TeamType } from "../../type-definitions";

export const ListingPage = () => {
  const { authedUser } = useAuth();
  const { teamId } = useParams();
  const { teamData, listingData } = useLoaderData() as {
    teamData: TeamType;
    listingData: ListingType;
  };
  const isMember = teamData.teammates.some(
    (m: { id: string | undefined }) => m.id === authedUser?.id
  );

  const [isCreateExpModalShowing, setIsCreateExpModalShowing] = useState(false);
  const [isDeleteListingModalShowing, setIsDeleteListingModalShowing] =
    useState(false);
  const [isDeleteExpModalShowing, setIsDeleteExpModalShowing] = useState(false);

  const [searchParams, _] = useSearchParams();
  const experienceId = searchParams.get("experience");

  const [tabs, setTabs] = useState(
    window.innerWidth > 639
      ? "experiences"
      : experienceId
      ? "experiences"
      : "listing"
  );

  if (!isMember) return <Navigate to={`/teams/${teamId}`} />;

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: "/teams", label: "Teams" },
          { to: `/teams/${teamData.id}`, label: teamData.name },
          {
            to: "",
            label: `${listingData.jobTitle} - ${listingData.companyName}`,
          },
        ]}
      />
      {isCreateExpModalShowing && (
        <CreateExperienceModal handleModal={setIsCreateExpModalShowing} />
      )}
      {isDeleteListingModalShowing && (
        <DeleteListingModal
          handleModal={setIsDeleteListingModalShowing}
          id={listingData.id}
        />
      )}
      {isDeleteExpModalShowing && (
        <DeleteExperienceModal handleModal={setIsDeleteExpModalShowing} />
      )}
      <div className="flex flex-col self-center w-full p-6 pt-2 pb-8 sm:max-w-7xl">
        <div className="flex gap-4 items-center pb-2 mb-2 sm:mb-8 sm:border-b sm:border-borderprimary">
          <FavoriteButton
            listing={listingData}
            size="xl"
            teamId={teamData.id}
          />
          <h1 className="text-headingColor text-xl font-semibold sm:text-2xl">
            {listingData.jobTitle} - {listingData.companyName}{" "}
            {listingData.salaryAmount && (
              <span className="inline-block text-xl text-green-700 sm:ml-auto">
                {formatSalary(
                  listingData.salaryAmount,
                  listingData.salaryFrequency
                )}
              </span>
            )}
          </h1>
          <NavLink
            to={`/${listingData.username}`}
            className="hidden self-end text-xs text-secondary ml-auto sm:flex"
          >
            {listingData.username}
          </NavLink>
        </div>
        <div className="sm:flex">
          <div className="sm:relative sm:w-2/5">
            <ListingTabs tabs={tabs} setTabs={setTabs} />
            <ListingExperiences
              tabs={tabs}
              setIsCreateExpModalShowing={setIsCreateExpModalShowing}
            />
            <ListingComments tabs={tabs} />
          </div>
          <div className="sm:w-3/5 sm:pl-12">
            {experienceId && (
              <ExperienceDetails
                tabs={tabs}
                setTabs={setTabs}
                handleModal={setIsDeleteExpModalShowing}
              />
            )}
            <ListingDetails
              tabs={tabs}
              handleModal={setIsDeleteListingModalShowing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const listingLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const { teamId, listingId } = params;

  const [teamResponse, listingResponse, commentResponse, userResponse] =
    await Promise.all([
      axios.get(`/api/teams/${teamId}`),
      axios.get(`/api/listings/${listingId}`),
      axios.get(`/api/comments/listing/${listingId}/team/${teamId}`),
      axios.get("/api/users/user"),
    ]);

  const teamData = teamResponse.data;
  const listingData = listingResponse.data;
  const commentData = commentResponse.data;
  const userData = userResponse.data;

  const experienceId = new URL(request.url).searchParams.get("experience");
  let experienceData;
  if (experienceId) {
    const experienceResponse = await axios.get(
      `/api/experiences/${experienceId}`
    );
    experienceData = experienceResponse.data;
  }

  return {
    teamData,
    listingData,
    commentData,
    userData,
    experienceData,
  };
};
