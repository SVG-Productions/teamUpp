import axios from "axios";
import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ListingDetails from "../components/ListingDetails";
import FavoriteButton from "../components/FavoriteButton";
import ListingTabs from "../components/ListingTabs";
import PencilButton from "../components/PencilButton";
import ListingExperiences from "../components/ListingExperiences";
import CommentsSection from "../components/CommentsSection";
import Experience from "../components/Experience";

export const ListingPage = () => {
  const { team, listing } = useLoaderData();
  const { authedUser } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const experienceId = searchParams.get("experience");

  const [tabs, setTabs] = useState(
    window.innerWidth > 639 ? "experiences" : "listing"
  );

  return (
    <div className="flex flex-col">
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
      <div className="flex flex-col p-6 pt-3 sm:flex-row">
        <div className="sm:w-1/3">
          <ListingTabs tabs={tabs} setTabs={setTabs} />
          <ListingExperiences
            selectedExperience={experienceId}
            setSearchParams={setSearchParams}
            tabs={tabs}
          />
          <CommentsSection
            authedUser={authedUser}
            listing={listing}
            tabs={tabs}
          />
        </div>
        <div className="sm:w-2/3 sm:pl-8">
          {experienceId ? <Experience /> : <ListingDetails tabs={tabs} />}
        </div>
        {/* {authedUser.id === listing.userId && (
            <PencilButton
              styling="w-8 h-8 bg-slate-900"
              href={`/teams/${team.id}/listings/${listing.id}/edit`}
            />
          )} */}
      </div>
    </div>
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
  let selectedExperience;
  if (experienceId) {
    const experienceResponse = await axios.get(
      `/api/experiences/${experienceId}`
    );
    selectedExperience = experienceResponse.data;
  }

  return {
    team,
    teammates: filteredTeammates,
    listing,
    favorites,
    comments,
    experiences,
    selectedExperience,
  };
};
