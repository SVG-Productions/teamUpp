import { NavLink, Navigate, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faStar,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FilterListingsModal from "../components/FilterListingsModal";
import sortListings from "../utils/sortListings";
import SearchInput from "../components/SearchInput";
import NullInfo from "../components/NullInfo";

export const FavoritesPage = () => {
  const { userData } = useLoaderData();
  const { authedUser } = useAuth();
  const { username } = useParams();

  const isAuthorizedUser = authedUser.username === username;

  const [searchFavorites, setSearchFavorites] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isSortDown, setIsSortDown] = useState(true);
  const [isFilterModalShowing, setIsFilterModalShowing] = useState(false);

  const sortedFavorites = sortListings(userData.favorites, sortBy, isSortDown);

  const handleSortClick = (sortByCategory) => {
    if (sortByCategory === sortBy) {
      setIsSortDown(!isSortDown);
    } else {
      setSortBy(sortByCategory);
      setIsSortDown("down");
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
        className={`flex flex-col flex-grow self-center w-full p-6 pb-8 overflow-hidden
        ${isFilterModalShowing && "max-h-[calc(100vh-12rem)]"} 
        sm:max-h-full sm:max-w-7xl sm:p-2 sm:pb-8`}
      >
        <FilterListingsModal
          isFilterModalShowing={isFilterModalShowing}
          handleFilterModal={setIsFilterModalShowing}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="flex justify-between items-center border-b border-borderprimary">
          <h1 className="text-headingColor font-semibold pb-2 ">Favorites</h1>
          <FontAwesomeIcon
            icon={faSliders}
            size="xl"
            className="text-iconPrimary cursor-pointer sm:hidden hover:text-iconSecondary"
            onClick={setIsFilterModalShowing}
          />
        </div>
        <div
          className="flex w-full py-4 sm:w-full sm:min-w-[440px] sm:p-4 sm:pb-0 sm:justify-between
          md:justify-start md:gap-12"
        >
          <div className="flex w-full gap-2 sm:w-2/3 sm:max-w-[440px]">
            <SearchInput
              placeholder="Search favorites..."
              searchValue={searchFavorites}
              handleChange={setSearchFavorites}
            />
          </div>
        </div>
        <table className="w-full table-fixed sm:table-auto">
          <thead>
            <tr className="border-b border-borderprimary text-left text-sm sm:table-row">
              <th className="w-10 py-2.5 pl-2.5 pr-1 sm:pt-12 sm:pr-0 sm:w-auto">
                <FontAwesomeIcon icon={faStar} />
              </th>
              <th className="py-2.5 font-semibold truncate sm:pt-12">
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
              <th className="w-[47%] py-2.5 sm:pt-12 sm:w-auto font-semibold">
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
              <th className="hidden py-2.5 sm:pt-12 font-semibold sm:table-cell">
                Salary
              </th>
              <th className="hidden py-2.5 font-semibold sm:table-cell sm:pt-12">
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
              <th className="w-12 py-2.5 font-semibold sm:w-auto sm:pt-12">
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
            {sortedFavorites.length ? (
              sortedFavorites.map((listing) => (
                <tr
                  key={listing.id}
                  className="hover:bg-highlight text-sm sm:text-base"
                >
                  <td className="py-2.5 pl-2.5 pr-1 sm:pr-0">
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
                    coming soon...
                  </td>
                  <td className="hidden py-2.5 sm:table-cell pr-1 sm:pr-0">
                    <NavLink to={`/${listing.username}`} className="flex">
                      <img
                        src={listing.photo || listing.avatar}
                        alt={listing.username}
                        className="rounded-full mr-3"
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
              ))
            ) : (
              <NullInfo />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const userData = userResponse.data;
  return { userData };
};
