import axios from "axios";

export const ListingExperiencesPage = () => {
  return <div>LISTING EXPERIENCES PAGE</div>;
};

export const listingExperiencesLoader = async ({ request, params }) => {
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
  const { listing, comments } = listingResponse.data;
  const { favorites } = userResponse.data;

  return { team, teammates: filteredTeammates, listing, favorites, comments };
};
