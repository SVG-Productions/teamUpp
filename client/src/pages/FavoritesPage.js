import { NavLink, Navigate, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faStar } from "@fortawesome/free-solid-svg-icons";
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
  console.log("userData", userData);

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
          <SortByDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortValues={sortValues}
          />
        </div>
        <table>
          <tr className="border-b text-left p-2.5">
            <th>
              <FontAwesomeIcon icon={faStar} />
            </th>
            <th>Company name</th>
            <th>Job title</th>
            <th>Salary</th>
            <th>Posted by</th>
            <th>Date</th>
          </tr>
          {sortedFavorites.map((listing) => (
            <tr key={listing.id} className="p-2.5">
              <td>
                <FavoriteButton listing={listing} />
              </td>
              <td>{listing.companyName}</td>
              <td>{listing.jobTitle}</td>
              <td>Coming Soon</td>
              <td>{listing.username}</td>
              <td>{formatGeneralDate(listing.createdAt)}</td>
            </tr>
          ))}
        </table>
        {/* <ul className="h-full sm:p-2 sm:pt-6">
          <div className="flex text-sm border-b p-2">
            <span className="w-8">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="w-[93%]">Name / Job title</span>
            <span className="w-16">Date</span>
          </div>
          {sortedFavorites.length ? (
            sortedFavorites.map((listing) => (
              <li
                key={listing.id}
                className="flex items-center px-2 rounded-sm hover:bg-highlight"
              >
                <div className="w-8">
                  <FavoriteButton listing={listing} size="lg" />
                </div>
                <NavLink
                  to={`/teams/${listing.teamId}/listings/${listing.id}`}
                  className="flex w-[93%] no-underline text-primary gap-2 py-2.5 items-center overflow-hidden"
                >
                  <div className="flex items-center overflow-hidden">
                    <span className="font-semibold">{listing.companyName}</span>
                    <span className="font-bold mx-1 sm:mx-2">/</span>
                    <span className="flex-nowrap truncate sm:px-0">
                      {listing.jobTitle}
                    </span>
                  </div>
                </NavLink>
                <span className="text-xs text-slate-400 w-16">
                  {formatGeneralDate(listing.createdAt)}
                </span>
              </li>
            ))
          ) : (
            <li>
              <NullInfo />
            </li>
          )}
        </ul> */}
      </div>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const userData = userResponse.data;
  return { userData };
};
