import axios from "axios";
import { useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ListingDetails from "../components/ListingDetails";
import FavoriteButton from "../components/FavoriteButton";
import ListingTabs from "../components/ListingTabs";

export const ListingPage = () => {
  const { team, listing } = useLoaderData();
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
      <div className="flex flex-col sm:flex-row p-6">
        <div className="sm:hidden">
          <ListingTabs />
        </div>
        <div className="hidden sm:block sm:w-5/12">
          <p>Listing Experiences</p>
        </div>
        <ListingDetails />
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
