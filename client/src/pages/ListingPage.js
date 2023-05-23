import axios from "axios";
import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
import CreateButton from "../components/CreateButton";
import ListingTabsMobile from "../components/ListingTabsMobile";

export const ListingPage = () => {
  const { team, listing } = useLoaderData();
  const { authedUser } = useAuth();

  const [isCreateExpModalShowing, setIsCreateExpModalShowing] = useState(false);
  const [isDeleteListingModalShowing, setIsDeleteListingModalShowing] =
    useState(false);
  const [isDeleteExpModalShowing, setIsDeleteExpModalShowing] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const experienceId = searchParams.get("experience");

  const [tabs, setTabs] = useState("experiences");
  const [mobileTabs, setMobileTabs] = useState(
    experienceId ? "exp" : "listing"
  );

  console.log(mobileTabs);

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
        <div className="sm:w-2/5">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <ListingTabs
              tabs={tabs}
              setTabs={setTabs}
              setMobileTabs={setMobileTabs}
            />
            <ListingTabsMobile
              mobileTabs={mobileTabs}
              setMobileTabs={setMobileTabs}
              setTabs={setTabs}
              experienceId={experienceId}
            />
            <div
              className={`${
                mobileTabs !== "experiences" && "hidden"
              } flex justify-between gap-2 items-center`}
            >
              <h2 className="text-slate-400 text-lg font-bold sm:hidden">
                EXPERIENCES
              </h2>
              <CreateButton
                onClick={() => setIsCreateExpModalShowing(true)}
                fill="white"
                backgroundColor="slate-900"
                iconSize="14px"
                className="w-7 h-7"
              />
            </div>
          </div>
          <ListingExperiences
            selectedExperience={experienceId}
            setSearchParams={setSearchParams}
            tabs={tabs}
            mobileTabs={mobileTabs}
            setMobileTabs={setMobileTabs}
          />
          <ListingComments
            authedUser={authedUser}
            listing={listing}
            tabs={tabs}
            mobileTabs={mobileTabs}
          />
        </div>
        <div className="sm:w-3/5 sm:pl-12">
          {experienceId ? (
            <ExperienceDetails
              tabs={tabs}
              mobileTabs={mobileTabs}
              setMobileTabs={setMobileTabs}
              setTabs={setTabs}
              handleModal={setIsDeleteExpModalShowing}
            />
          ) : (
            <ListingDetails
              tabs={tabs}
              mobileTabs={mobileTabs}
              handleModal={setIsDeleteListingModalShowing}
            />
          )}
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
