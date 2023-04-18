import { useState } from "react";
import {
  NavLink,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import NullInfo from "../components/NullInfo";
import FavoriteButton from "../components/FavoriteButton";
import DropdownMenuButton from "../components/DropdownMenuButton";
import formatDate from "../utils/formatDate";

export const TeamPage = () => {
  const { singleTeam, teammates, requested, authorizedTeammates, listings } =
    useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { id, name, jobField, description } = singleTeam;
  const isAuthorized = authorizedTeammates.includes(authedUser.id);
  const isTeammate = teammates.some((tm) => tm.id === authedUser.id);
  const tab = searchParams.get("tab");
  const listedUsers = tab && tab.includes("requests") ? requested : teammates;

  const [friendRequest, setFriendRequest] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const userId = await axios.get(`/api/users/usernames/${friendRequest}`);
      try {
        await axios.post(`/api/teams/${id}/teammates`, {
          userId: userId.data,
          status: "invited",
        });
        setIsSuccess(true);
        setSubmissionMessage("Invite sent successfully!");
      } catch (error) {
        setIsSuccess(false);
        setSubmissionMessage("User already a teammate or invited!");
      }
    } catch (error) {
      setIsSuccess(false);
      setSubmissionMessage("Username doesn't exist!");
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/teams/${id}/teammates`, {
        userId: authedUser.id,
        status: "requested",
      });
      setIsSuccess(true);
      setSubmissionMessage("Request sent successfully!");
    } catch (error) {
      setIsSuccess(false);
      setSubmissionMessage("Request or invite already pending.");
    }
  };

  const handleAddListing = () => {
    navigate(`/teams/${id}/create-listing`);
  };

  return (
    <>
      <div className="relative">
        <AuthedPageTitle>
          <NavLink to="/teams" className="hover:underline">
            Teams
          </NavLink>{" "}
          / {name}
        </AuthedPageTitle>
        <div className="absolute right-0 top-1">
          {isAuthorized && (
            <NavLink
              to={`/teams/${id}/settings`}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 hover:bg-slate-500 ml-2 text-xl font-bold text-white"
            >
              &#9998;
            </NavLink>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-10 mt-8 w-full h-[90%]">
        <div className="sm:w-2/3 h-full">
          <ScrollableList
            title="Team Listings"
            height="sm:h-full"
            width="sm:w-full"
            hasAddButton={true}
            onClick={handleAddListing}
          >
            {listings.map((listing, index) => (
              <div
                key={index}
                className="flex flex-row bg-white p-2.5 rounded-md"
              >
                <div className="flex flex-row w-2/3 items-center">
                  <FavoriteButton listing={listing} />
                  <div className="text-xs sm:text-lg font-bold">
                    {listing.companyName}
                  </div>
                  <div className="hidden sm:block sm:text-lg font-bold mx-2">
                    /
                  </div>
                  <div className="text-xs sm:text-base px-3 sm:px-0">
                    {listing.jobTitle}
                  </div>
                </div>
                <div className="flex flex-row justify-end w-1/3 items-center">
                  <div className="text-xs sm:text-sm">
                    {formatDate(listing.createdAt)}
                  </div>
                  <DropdownMenuButton />
                </div>
              </div>
            ))}
          </ScrollableList>
        </div>
        <div className="flex flex-col gap-8 sm:w-1/3 h-full">
          {isTeammate ? (
            <form
              onSubmit={handleInvite}
              className="relative rounded-sm bg-slate-100 shadow p-4 pb-6"
            >
              <label htmlFor="friendRequest" className="font-semibold">
                Invite a friend to join{" "}
                <span className="font-bold">{name}!</span>
              </label>
              <div className="flex justify-between gap-4 mt-4">
                <input
                  className="w-3/4 rounded-sm text-sm px-2"
                  id="friendRequest"
                  type="text"
                  value={friendRequest}
                  placeholder="Enter username..."
                  onChange={(e) => setFriendRequest(e.target.value)}
                  required
                />
                <button className="py-1 px-2 w-1/4 bg-blue-500 hover:bg-blue-300 rounded-sm text-white text-sm">
                  Invite
                </button>
              </div>
              {submissionMessage && (
                <p
                  className={`absolute bottom-1 ${
                    isSuccess ? "text-emerald-500" : "text-red-500"
                  } text-[10px] lg:text-xs font-bold pl-1 whitespace-nowrap`}
                >
                  {submissionMessage}
                </p>
              )}
            </form>
          ) : (
            <div className="flex flex-col relative rounded-sm bg-slate-100 shadow p-6">
              <div className="flex justify-between gap-4">
                <p className="font-semibold text-center">
                  Join <span className="font-bold">{name}!</span>
                </p>
                <button
                  className="py-1 px-2 w-1/4 bg-blue-500 hover:bg-blue-300 rounded-sm text-white text-sm"
                  onClick={handleRequest}
                >
                  Request
                </button>
              </div>
              {submissionMessage && (
                <p
                  className={`absolute bottom-1 ${
                    isSuccess ? "text-emerald-500" : "text-red-500"
                  } text-[10px] lg:text-xs font-bold whitespace-nowrap mb-1`}
                >
                  {submissionMessage}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col max-h-60 sm:max-h-max sm:w-full sm:h-2/3 rounded-sm bg-slate-100 shadow">
            <p className="relative z-10 p-3 font-bold shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)]">
              {jobField}
            </p>
            <div className="h-full p-4 m-1 mt-0 bg-white rounded-sm overflow-auto">
              {description ? description : <NullInfo />}
            </div>
          </div>
          <div className="sm:h-2/5">
            <div className="flex gap-3 px-2">
              <button
                className={`border-black pb-1 w-28 text-center ${
                  !tab ? "border-b-4 font-bold" : "border-b"
                }`}
                onClick={() => setSearchParams({})}
              >
                Teammates
              </button>
              <button
                className={`border-black pb-1 w-28 text-center ${
                  tab && tab.includes("requests")
                    ? "border-b-4 font-bold"
                    : "border-b"
                }`}
                onClick={() => setSearchParams({ tab: "requests" })}
              >
                Requests
              </button>
            </div>
            <ScrollableList height="">
              {listedUsers.length === 0 ? (
                <p className="p-2.5">Nothing to see here...</p>
              ) : (
                listedUsers.map((teammate, index) => (
                  <NavLink
                    to={`/${teammate.username}`}
                    className="flex p-2.5 rounded-sm hover:bg-blue-100"
                    key={`${teammate.id}-${index}`}
                  >
                    <div className="bg-white rounded-full w-6 h-6 mr-4" />
                    <p>
                      {teammate.username}
                      <span className="p-4 text-xs text-gray-400">
                        {teammate.status}
                      </span>
                    </p>
                  </NavLink>
                ))
              )}
            </ScrollableList>
          </div>
        </div>
      </div>
    </>
  );
};

export const teamLoader = async ({ request, params }) => {
  const { teamId } = params;
  const { data } = await axios.get("/api/session");
  if (data) {
    const [singleTeamData, teammatesData, listingsData, favoritesData] =
      await Promise.all([
        axios.get(`/api/teams/${teamId}`),
        axios.get(`/api/teams/${teamId}/teammates`),
        axios.get(`/api/teams/${teamId}/listings`),
        axios.get(`/api/users/${data.id}/favorites`),
      ]);
    const favorites = favoritesData.data;
    const singleTeam = singleTeamData.data;
    const listings = listingsData.data;
    const teammates = teammatesData.data.filter(
      (tm) => tm.status !== "invited" && tm.status !== "requested"
    );
    const requested = teammatesData.data.filter(
      (tm) => tm.status === "requested"
    );
    const authorizedTeammates = teammates
      .filter((tm) => tm.status === "owner" || tm.status === "admin")
      .reduce((acc, tm) => {
        acc.push(tm.id);
        return acc;
      }, []);
    return {
      singleTeam,
      teammates,
      requested,
      authorizedTeammates,
      favorites,
      listings,
    };
  }
  return null;
};
