import axios from "axios";
import { useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FavoriteButton from "../components/FavoriteButton";
import PencilButton from "../components/PencilButton";
import { useAuth } from "../context/AuthContext";
import ListingComments from "../components/ListingComments";
import ListingTeammatesSection from "../components/ListingTeammatesSection";
import ListingTabs from "../components/ListingTabs";
import ListingDetails from "../components/ListingDetails";

export const ListingDetailsPage = () => {
  const { team, listing } = useLoaderData();
  const { authedUser } = useAuth();

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/teams/${team.id}`, label: team.name },
          { to: `/teams/${team.id}`, label: "Listings" },
          {
            label: `${listing.companyName} - ${listing.jobTitle}`,
          },
        ]}
      >
        <FavoriteButton listing={listing} dimensions="w-10 h-10" />
      </AuthedPageTitle>
      <div className="flex justify-between">
        <div className="flex gap-4">
          {authedUser.id === listing.userId && (
            <PencilButton
              styling="w-8 h-8 bg-slate-100"
              fill="black"
              href={`/teams/${team.id}/listings/${listing.id}/edit`}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-8 w-full h-[90%]">
        <div className="flex flex-col min-h-3/5 w-full">
          <ListingTabs />
          <ListingDetails />
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

export const listingDetailsLoader = async ({ request, params }) => {
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
