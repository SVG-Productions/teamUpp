import axios from "axios";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthedPageTitle from "../components/AuthedPageTitle";
import PencilButton from "../components/PencilButton";
import FavoriteButton from "../components/FavoriteButton";
import ListingComments from "../components/ListingComments";
import DeleteExperienceModal from "../components/DeleteExperienceModal";
import ListingTeammatesSection from "../components/ListingTeammatesSection";
import ListingTabs from "../components/ListingTabs";
import ListingExperiences from "../components/ListingExperiences";
import Experience from "../components/Experience";

export const ListingExperiencesPage = () => {
  const { team, listing, experience } = useLoaderData();
  const { authedUser } = useAuth();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id: teamId, name } = team;
  const { id: listingId, companyName, jobTitle } = listing;
  const listingParam = searchParams.get("experience");

  return (
    <>
      <DeleteExperienceModal
        isOpen={isModalShowing}
        onClose={() => setIsModalShowing(false)}
      />
      <div className="flex justify-between">
        <AuthedPageTitle
          links={[
            { to: `/teams/${teamId}`, label: name },
            { to: `/teams/${teamId}`, label: "Listings" },
            { label: `${companyName} - ${jobTitle}` },
          ]}
        />
        <div className="flex gap-4">
          {authedUser.id === listing.userId && (
            <PencilButton
              href={`/teams/${teamId}/listings/${listingId}/edit`}
            />
          )}
          <FavoriteButton listing={listing} dimensions="w-10 h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-8 w-full h-[90%]">
        <div className="flex flex-col min-h-3/5 w-full">
          <ListingTabs />
          <div className="flex flex-col gap-6 sm:flex-row pt-1 sm:min-h-[350px] sm:max-h-[350px]">
            <div
              className={`h-60 sm:h-full ${
                listingParam ? "sm:w-3/5" : "sm:w-full"
              }`}
            >
              <ListingExperiences
                selectedExperience={experience}
                setSearchParams={setSearchParams}
              />
            </div>
            {listingParam && (
              <Experience
                setSearchParams={setSearchParams}
                setIsModalShowing={setIsModalShowing}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 h-2/5">
          <div className="sm:w-3/5 sm:h-auto h-60">
            <ListingComments listing={listing} authedUser={authedUser} />
          </div>
          <div className="sm:w-2/5 sm:h-auto h-60">
            <ListingTeammatesSection />
          </div>
        </div>
      </div>
    </>
  );
};

export const listingExperiencesLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;

  const experienceId = new URL(request.url).searchParams.get("experience");
  let experience;
  if (experienceId) {
    const experienceResponse = await axios.get(
      `/api/experiences/${experienceId}`
    );
    experience = experienceResponse.data;
  }

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
