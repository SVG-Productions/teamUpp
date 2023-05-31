import axios from "axios";
import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

export const ListingPage = () => {
  const { teamData, listingData } = useLoaderData();
  const { authedUser } = useAuth();

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

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: "/teams", label: "Teams" },
          { to: `/teams/${teamData.id}`, label: teamData.name },
          {
            label: `${listingData.jobTitle} - ${listingData.companyName}`,
          },
        ]}
      />
      {isCreateExpModalShowing && (
        <CreateExperienceModal handleModal={setIsCreateExpModalShowing} />
      )}
      {isDeleteListingModalShowing && (
        <DeleteListingModal handleModal={setIsDeleteListingModalShowing} />
      )}
      {isDeleteExpModalShowing && (
        <DeleteExperienceModal handleModal={setIsDeleteExpModalShowing} />
      )}
      <div className="flex flex-col pt-3 p-6 sm:p-12 sm:pt-8 sm:flex-row">
        <div className="sm:relative sm:w-2/5">
          <div className="flex justify-between items-center mb-8 sm:hidden">
            <div className="flex gap-4 items-center">
              <FavoriteButton listing={listingData} size="xl" />
              <h2 className="text-headingColor text-lg font-bold uppercase sm:text-xl">
                {listingData.jobTitle} - {listingData.companyName}
              </h2>
            </div>
            {authedUser.id === listingData.userId && (
              <FontAwesomeIcon
                icon={faTrashCan}
                className="cursor-pointer text-iconPrimary hover:text-red-500 mr-2"
                size="xl"
                onClick={() => setIsDeleteExpModalShowing(true)}
              />
            )}
          </div>
          <ListingTabs tabs={tabs} setTabs={setTabs} />
          <ListingExperiences
            tabs={tabs}
            setIsCreateExpModalShowing={setIsCreateExpModalShowing}
          />
          <ListingComments listing={listingData} tabs={tabs} />
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
    </>
  );
};

export const listingLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;

  const [teamResponse, listingResponse, userResponse] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get(`/api/listings/${listingId}`),
    axios.get("/api/session/user"),
  ]);

  const teamData = teamResponse.data;
  const listingData = listingResponse.data;
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
    userData,
    experienceData,
  };
};
