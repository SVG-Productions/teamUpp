import { NavLink, Navigate, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SortByDropdown from "../components/SortByDropdown";
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
  const [sortBy, setSortBy] = useState("none");
  const [isFilterModalShowing, setIsFilterModalShowing] = useState(false);

  const sortValues = ["none", "company", "position", "date"];
  const sortedFavorites = sortListings(userData.favorites, sortBy);

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
        className={`flex flex-col flex-grow self-center w-full p-6 pb-8
        ${isFilterModalShowing && "max-h-[calc(100vh-12rem)] overflow-hidden"} 
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
            icon={faArrowDownWideShort}
            size="xl"
            className="text-iconPrimary cursor-pointer sm:hidden"
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
          <SortByDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortValues={sortValues}
          />
        </div>
        <ul className="h-full sm:p-2 sm:pt-6">
          {sortedFavorites.length ? (
            sortedFavorites.map((listing) => (
              <li
                key={listing.id}
                className="flex justify-between items-center rounded-sm hover:bg-highlight sm:px-2"
              >
                <FavoriteButton listing={listing} size="xl" />
                <NavLink
                  to={`/teams/${listing.teamId}/listings/${listing.id}`}
                  className="flex no-underline text-primary gap-2 ml-2 py-2.5 items-center justify-between w-full overflow-hidden"
                >
                  <div className="flex items-center overflow-hidden">
                    <p className="text-xs font-semibold sm:text-lg">
                      {listing.companyName}
                    </p>
                    <p className="font-bold mx-1 sm:mx-2 sm:text-lg">/</p>
                    <p className="flex-nowrap text-xs truncate sm:px-0 sm:text-base">
                      {listing.jobTitle}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 sm:text-sm">
                    {formatGeneralDate(listing.createdAt)}
                  </p>
                </NavLink>
              </li>
            ))
          ) : (
            <li>
              <NullInfo />
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const userData = userResponse.data;
  return { userData };
};
