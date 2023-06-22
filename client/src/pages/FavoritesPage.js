import { NavLink, Navigate, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import sortListings from "../utils/sortListings";
import SearchInput from "../components/SearchInput";
import NullInfo from "../components/NullInfo";
import { formatSalary } from "../utils/formatSalary";

export const FavoritesPage = () => {
  const { userData } = useLoaderData();
  const { authedUser } = useAuth();
  const { username } = useParams();

  const isAuthorizedUser = authedUser.username === username;

  const [searchFavorites, setSearchFavorites] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isSortDown, setIsSortDown] = useState(true);

  const sortedFavorites = sortListings(userData.favorites, sortBy, isSortDown);

  const handleSortClick = (sortByCategory) => {
    if (sortByCategory === sortBy) {
      setIsSortDown(!isSortDown);
    } else {
      setSortBy(sortByCategory);
      setIsSortDown(true);
    }
  };

  if (!isAuthorizedUser) return <Navigate to={`/${username}`} />;

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${authedUser.username}`, label: authedUser.username },
          { label: "Favorites" },
        ]}
      />
      <div
        className="flex flex-col self-center w-full p-6 pb-8 overflow-hidden
        sm:max-h-full sm:max-w-7xl sm:pb-8"
      >
        <h1 className="text-headingColor font-semibold pb-2 border-b border-borderprimary">
          Favorites
        </h1>
        <div
          className="flex w-full gap-2 py-4 sm:max-w-[440px] sm:min-w-[440px] sm:pb-0 sm:justify-between
          md:justify-start"
        >
          <SearchInput
            placeholder="Search favorites..."
            searchValue={searchFavorites}
            handleChange={setSearchFavorites}
          />
        </div>
        <table className="w-full table-fixed mt-4 sm:table-auto">
          <thead>
            <tr className="border-b border-borderprimary text-left text-sm sm:table-row">
              <th className="w-10 py-2.5 pl-0 pr-1 sm:pl-2.5 sm:pr-0 sm:w-auto">
                <FontAwesomeIcon icon={faStar} />
              </th>
              <th className="py-2.5 font-semibold truncate">
                <button
                  onClick={() => handleSortClick("company")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "company" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Company</span>
                  {sortBy === "company" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="w-[48%] pl-4 py-2.5 sm:w-auto sm:pl-0 font-semibold">
                <button
                  onClick={() => handleSortClick("position")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "position" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Job Title</span>
                  {sortBy === "position" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="hidden py-2.5 font-semibold sm:table-cell">
                <button
                  onClick={() => handleSortClick("salary")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "salary" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Salary</span>
                  {sortBy === "salary" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="hidden py-2.5 font-semibold sm:table-cell">
                <button
                  onClick={() => handleSortClick("username")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "username" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Posted by</span>
                  {sortBy === "username" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="w-12 py-2.5 font-semibold sm:w-auto">
                <button
                  onClick={() => handleSortClick("date")}
                  className={`flex items-center hover:text-secondary ${
                    sortBy === "date" && "text-secondary"
                  }`}
                >
                  <span className="mr-1">Date</span>
                  {sortBy === "date" && !isSortDown ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedFavorites.length !== 0 &&
              sortedFavorites.map((listing) => (
                <tr
                  key={listing.id}
                  className="hover:bg-highlight text-sm sm:text-base"
                >
                  <td className="py-2.5 pl-0 pr-1 sm:pl-2.5 sm:pr-0">
                    <FavoriteButton listing={listing} size="lg" />
                  </td>
                  <td className="py-2.5 truncate pr-1 sm:pr-0">
                    {listing.companyName}
                  </td>
                  <td className="py-2.5 truncate pr-1 sm:pr-0">
                    <NavLink
                      to={`/teams/${listing.teamId}/listings/${listing.id}`}
                    >
                      {listing.jobTitle}
                    </NavLink>
                  </td>
                  <td className="hidden py-2.5 text-sm text-slate-400 pr-1 sm:pr-0 sm:table-cell">
                    {formatSalary(
                      listing.salaryAmount,
                      listing.salaryFrequency
                    )}
                  </td>
                  <td className="hidden py-2.5 sm:table-cell pr-1 sm:pr-0">
                    <NavLink to={`/${listing.username}`} className="flex">
                      <img
                        src={listing.photo || listing.avatar}
                        alt={listing.username}
                        className="rounded-full mr-3 w-7 h-7"
                        width={28}
                        height={28}
                      />
                      {listing.username}
                    </NavLink>
                  </td>
                  <td className="py-2.5 pr-2.5 text-xs text-slate-400">
                    {formatGeneralDate(listing.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {sortedFavorites.length === 0 && (
          <div className="p-4">
            <NullInfo message="You have no favorites." />
          </div>
        )}
      </div>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const userData = userResponse.data;
  return { userData };
};
