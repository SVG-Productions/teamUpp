import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FavoriteButton from "../components/FavoriteButton";
import PencilButton from "../components/PencilButton";
import { useAuth } from "../context/AuthContext";
import CommentsSection from "../components/CommentsSection";
import ListingTeammatesSection from "../components/ListingTeammatesSection";

export const ListingDetailsPage = () => {
  const { team, teammates, listing } = useLoaderData();
  const { authedUser } = useAuth();

  return (
    <>
      <div className="flex justify-between">
        <AuthedPageTitle>
          <NavLink to={`/teams/${team.id}`} className="hover:underline">
            {team.name}
          </NavLink>{" "}
          /{" "}
          <NavLink to={`/teams/${team.id}`} className="hover:underline">
            Listings
          </NavLink>{" "}
          / {listing.companyName} - {listing.jobTitle}
        </AuthedPageTitle>
        <div className="flex gap-4">
          {authedUser.id === listing.userId && (
            <PencilButton
              href={`/teams/${team.id}/listings/${listing.id}/edit`}
            />
          )}
          <FavoriteButton listing={listing} dimensions="w-10 h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-8 w-full h-[90%]">
        <div className="flex flex-col min-h-3/5 w-full">
          <div className="flex gap-3 w-1/4 px-2">
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-[3px] font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/details`}
            >
              Details
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-[3px] font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/experiences`}
            >
              Experiences
            </NavLink>
          </div>
          <div
            className="flex flex-col sm:flex-row pt-1 sm:min-h-[350px] sm:max-h-[350px]
          rounded-md w-auto bg-slate-100 shadow"
          >
            <div
              className="flex flex-col gap-4 h-full w-full sm:w-1/2 sm:border-8
              sm:border-transparent sm:border-r-2 sm:border-r-black p-4 overflow-y-scroll"
            >
              <div>
                <p className="font-bold">Job Title:</p>
                <p>{listing.jobTitle}</p>
              </div>
              <div>
                <p className="font-bold">Link to Apply:</p>
                <a
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href={`${listing.jobLink}`}
                >
                  {listing.jobLink}
                </a>
              </div>
              <div>
                <p className="font-bold">Company Name:</p>
                <p>{listing.companyName}</p>
              </div>
              <div>
                <p className="font-bold">Company Details:</p>
                <p>{listing.companyDetails}</p>
              </div>
            </div>
            <div
              className="h-full w-full sm:w-1/2 sm:border-8 sm:border-transparent
            sm:border-l-2 sm:border-l-black  p-4"
            >
              <p className="font-bold">Job Description:</p>
              <p>{listing.jobDescription}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 h-2/5">
          <CommentsSection listing={listing} authedUser={authedUser} />
          <ListingTeammatesSection teammates={teammates} />
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
