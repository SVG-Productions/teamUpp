import axios from "axios";
import { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import FavoriteButton from "../components/FavoriteButton";
import { useAuth } from "../context/AuthContext";

export const ListingDetailsPage = () => {
  const { team, teammates, listing, comments } = useLoaderData();
  const { authedUser } = useAuth();
  const [showAddCommentInput, setShowAddCommentInput] = useState(false);

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
            <NavLink
              to={`/teams/${team.id}/listings/${listing.id}/edit`}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 hover:bg-slate-500 ml-2 text-xl font-bold text-white"
            >
              &#9998;
            </NavLink>
          )}
          <FavoriteButton listing={listing} dimensions="w-10 h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-8 w-full h-[90%]">
        <div className="flex flex-col h-3/5 w-full">
          <div className="flex gap-3 w-1/4 px-2">
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-4 font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/details`}
            >
              Details
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-4 font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/experiences`}
            >
              Experiences
            </NavLink>
          </div>
          <div
            className="flex flex-col sm:flex-row h-full pt-1 sm:min-h-[200px]
          rounded-md w-auto bg-slate-100 shadow"
          >
            <div
              className="flex flex-col gap-4 h-full w-full sm:w-1/2 sm:border-8
              sm:border-transparent sm:border-r-2 sm:border-r-black p-4"
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
          <ScrollableList
            title="Comments"
            width="sm:w-3/5"
            hasAddButton="true"
            onClick={() => setShowAddCommentInput(!showAddCommentInput)}
          >
            {showAddCommentInput
              ? "something"
              : comments.map((comment, index) => (
                  <div className="flex flex-start p-2.5 border-b ">
                    <div className="flex flex-col">
                      <NavLink
                        to={`/${comment.username}`}
                        className="flex bg-white rounded-full w-9 h-9 mr-3 hover:bg-blue-100 "
                        key={`${comment.id}-${index}`}
                      ></NavLink>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between font-bold">
                        {comment.username}
                        <div className="text-xs text-slate-600 hover:text-red-900 cursor-pointer">
                          edit / delete
                        </div>
                      </div>
                      <p className=" break-all"> {comment.content}</p>
                    </div>
                  </div>
                ))}
          </ScrollableList>
          <ScrollableList title="All Teammates" width="sm:w-2/5">
            {teammates.map((teammate, index) => (
              <NavLink
                to={`/${teammate.username}`}
                className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
                key={`${teammate.id}-${index}`}
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

export const listingDetailsLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;
  const { data } = await axios.get("/api/session");
  if (data) {
    const [teamData, teammatesData, listingData, favoritesData, commentsData] =
      await Promise.all([
        axios.get(`/api/teams/${teamId}`),
        axios.get(`/api/teams/${teamId}/teammates`),
        axios.get(`/api/listings/${listingId}`),
        axios.get(`/api/users/${data.id}/favorites`),
        axios.get(`/api/comments/${listingId}`),
      ]);

    const team = teamData.data;
    const teammates = teammatesData.data.filter(
      (tm) => tm.status !== "invited" && tm.status !== "requested"
    );
    const listing = listingData.data;
    const favorites = favoritesData.data;
    const comments = commentsData.data;

    return { team, teammates, listing, favorites, comments };
  }
  return null;
};
