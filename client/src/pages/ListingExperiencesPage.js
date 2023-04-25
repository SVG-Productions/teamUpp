import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import PencilButton from "../components/PencilButton";
import FavoriteButton from "../components/FavoriteButton";
import CommentsSection from "../components/CommentsSection";
import ScrollableList from "../components/ScrollableList";
import formatDate from "../utils/formatDate";
import DropdownMenuButton from "../components/DropdownMenuButton";

export const ListingExperiencesPage = () => {
  const { team, teammates, listing, experiences } = useLoaderData();
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
          <div className="flex flex-col sm:flex-row pt-1 sm:min-h-[350px] sm:max-h-[350px]">
            <ScrollableList
              title="Experiences"
              width="sm:w-full"
              height="sm:h-full"
              hasAddButton="true"
            >
              {experiences.map((experience, index) => (
                <div
                  key={index}
                  className="flex flex-row bg-white p-2.5 rounded-md"
                >
                  <div className="flex flex-row w-2/3 items-center">
                    <NavLink
                      className="text-xs sm:text-lg font-bold hover:underline"
                      to="#"
                    >
                      {experience.title}
                    </NavLink>
                    <div className="hidden sm:block sm:text-lg font-bold mx-2">
                      /
                    </div>
                    <div className="text-xs sm:text-base px-3 sm:px-0">
                      {experience.username}
                    </div>
                  </div>
                  <div className="flex flex-row justify-end w-1/3 items-center">
                    <div className="text-xs sm:text-sm">
                      {formatDate(experience.createdAt)}
                    </div>
                    <DropdownMenuButton />
                  </div>
                </div>
              ))}
            </ScrollableList>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 h-2/5">
          <CommentsSection listing={listing} authedUser={authedUser} />
          <ScrollableList title="All Teammates" width="sm:w-2/5">
            {teammates.map((teammate, index) => (
              <NavLink
                key={`${teammate.id}-${index}`}
                to={`/${teammate.username}`}
                className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
              >
                <div className="bg-white rounded-full w-6 h-6 mr-4" />
                <p> {teammate.username}</p>
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
    </>
  );
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
  const { listing, comments, experiences } = listingResponse.data;
  const { favorites } = userResponse.data;

  return {
    team,
    teammates: filteredTeammates,
    listing,
    favorites,
    comments,
    experiences,
  };
};
