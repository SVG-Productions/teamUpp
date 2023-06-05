import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Navigate,
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

export const ListingPage = () => {
  const { authedUser } = useAuth();
  const { teamId } = useParams();
  const { teamData, listingData } = useLoaderData();
  const isMember = teamData.teammates.some((m) => m.id === authedUser.id);

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
      <div className="flex flex-col self-center w-full p-6 pt-2 pb-8 sm:max-w-7xl">
        <div className="flex gap-4 items-center pb-2 mb-2 sm:mb-8 sm:border-b sm:border-borderprimary">
          <FavoriteButton listing={listingData} size="xl" />
          <h1 className="text-headingColor text-xl font-semibold sm:text-2xl">
            {listingData.jobTitle} - {listingData.companyName}
          </h1>
        </div>
        <div className="sm:flex">
          <div className="sm:relative sm:w-2/5">
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
