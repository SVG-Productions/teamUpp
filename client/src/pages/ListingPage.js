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

export const ListingPage = () => {
  const { team, listing } = useLoaderData();

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
          { to: `/teams/${team.id}`, label: team.name },
          {
            label: `${listing.companyName} - ${listing.jobTitle}`,
          },
        ]}
      >
        <FavoriteButton listing={listing} dimensions="h-8 w-8" />
      </AuthedPageTitle>
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
          <ListingTabs tabs={tabs} setTabs={setTabs} />
          <ListingExperiences
            tabs={tabs}
            setIsCreateExpModalShowing={setIsCreateExpModalShowing}
          />
          <ListingComments listing={listing} tabs={tabs} />
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

  const { team, teammates } = teamResponse.data;
  const filteredTeammates = teammates.filter(
    (tm) => tm.status !== "invited" && tm.status !== "requested"
  );
  const { listing, comments, experiences } = listingResponse.data;
  const { favorites } = userResponse.data;

  const experienceId = new URL(request.url).searchParams.get("experience");
  let experience;
  if (experienceId) {
    const experienceResponse = await axios.get(
      `/api/experiences/${experienceId}`
    );
    experience = experienceResponse.data;
  }

  return {
    team,
    teammates: filteredTeammates,
    listing,
    favorites,
    comments,
    experiences,
    experience,
  };
};
