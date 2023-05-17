import { NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import formatDate from "../utils/formatDate";
import FilterButton from "../components/FilterButton";
import { useState } from "react";
import SortByDropdown from "../components/SortByDropdown";
import FilterListingsModal from "../components/FilterListingsModal";
import sortListings from "../utils/sortListings";

export const FavoritesPage = () => {
  const { favorites } = useLoaderData();
  const { authedUser } = useAuth();
  const [searchFavorites, setSearchFavorites] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [isFilterModalShowing, setIsFilterModalShowing] = useState(false);

  const sortValues = ["none", "company", "position", "date"];
  const sortedFavorites = sortListings(favorites, sortBy);

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${authedUser.username}`, label: authedUser.username },
          { label: "Favorites" },
        ]}
      />
      <div
        className={`flex flex-col flex-grow w-full rounded-sm p-6 
        ${isFilterModalShowing && "max-h-[calc(100vh-12rem)] overflow-hidden"} 
        sm:max-h-full sm:py-4 sm:px-12 sm:pt-8`}
      >
        <FilterListingsModal
          isFilterModalShowing={isFilterModalShowing}
          handleFilterModal={setIsFilterModalShowing}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="flex justify-between">
          <h1 className="font-bold text-slate-400 text-lg sm:text-xl sm:pl-2">
            FAVORITES
          </h1>
          <FilterButton handleFilterModal={setIsFilterModalShowing} />
        </div>
        <div
          className="flex w-full py-4 sm:w-full sm:min-w-[440px] sm:p-4 sm:pb-0 sm:justify-between
          md:justify-start md:gap-12"
        >
          <div className="flex w-full gap-2 sm:w-2/3 sm:max-w-[440px]">
            <input
              className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
              id="search"
              placeholder="Search favorites..."
              type="text"
              value={searchFavorites}
              onChange={(e) => setSearchFavorites(e.target.value)}
            />
            <button
              className="w-1/3 text-sm bg-slate-900 hover:bg-blue-900 text-white 
              font-bold rounded-md focus:shadow-outline sm:w-[100px]"
            >
              Search
            </button>
          </div>
          <SortByDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortValues={sortValues}
          />
        </div>
        <ul className="h-full sm:p-2">
          {sortedFavorites.map((listing, index) => (
            <li
              key={index}
              className="flex flex-row bg-white py-2.5 justify-between"
            >
              <div className="flex items-center">
                <FavoriteButton listing={listing} />
                <div
                  className="text-xs font-bold 
                overflow-hidden overflow-ellipsis inline-block whitespace-nowrap sm:text-lg"
                >
                  {listing.companyName}
                </div>
                <div className="hidden font-bold mx-2 sm:block sm:text-lg">
                  /
                </div>
                <NavLink
                  className="flex-nowrap text-xs px-3 hover:underline sm:px-0 sm:text-base"
                  to={`/teams/${listing.teamId}/listings/${listing.id}`}
                >
                  {listing.jobTitle}
                </NavLink>
              </div>
              <div className="text-xs text-slate-400 sm:text-sm sm:justify-end">
                {formatDate(listing.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const { favorites } = userResponse.data;

  return { favorites };
};
