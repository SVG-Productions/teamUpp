import {
  NavLink,
  Navigate,
  Params,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import SearchInput from "../components/SearchInput";
import NullInfo from "../components/NullInfo";
import { formatSalary } from "../utils/formatSalary";
import Pagination from "../components/Pagination";
import React from "react";
import { ListingType, UserType } from "../../type-definitions";

export const FavoritesPage = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const { authedUser } = useAuth();
  const { username } = useParams();

  const isAuthorizedUser = authedUser?.username === username;

  const [searchParams, setSearchParams] = useSearchParams({
    sort: "created_atDesc",
  });

  const handleSortClick = (sortByCategory: string) => {
    if (sortByCategory + "Asc" === searchParams.get("sort")) {
      setSearchParams((prev) => {
        searchParams.set("sort", sortByCategory + "Desc");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        searchParams.set("sort", sortByCategory + "Asc");
        return prev;
      });
    }
  };

  if (!isAuthorizedUser) return <Navigate to={`/${username}`} />;

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${authedUser?.username}`, label: authedUser?.username },
          { to: "", label: "Favorites" },
        ]}
      />
      <div
        className="flex flex-col self-center w-full p-6 pb-8 overflow-hidden
        sm:max-h-full sm:max-w-7xl sm:pb-8"
      >
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Favorites
        </h1>
        <div className="flex flex-col gap-4 w-full py-4 sm:w-3/4 md:w-1/2 lg:w-4/5 lg:flex-row lg:gap-12">
          <SearchInput placeholder="Search favorites..." />
        </div>
        <div className="flex flex-col sm:min-h-[521px]">
          <table className="w-full table-fixed mt-4 sm:table-auto">
            <thead>
              <tr className="border-b border-borderprimary text-left text-sm">
                <th className="w-10 py-2.5 pl-0 pr-1 sm:pl-2.5 sm:pr-0 sm:w-auto">
                  <FontAwesomeIcon icon={faStar} />
                </th>
                <th className="py-2.5 font-semibold truncate">
                  <button
                    onClick={() => handleSortClick("company_name")}
                    className={`flex items-center hover:text-secondary ${
                      searchParams.get("sort")?.includes("company_name") &&
                      "text-secondary"
                    }`}
                  >
                    <span className="mr-1">Company</span>
                    {searchParams.get("sort")?.includes("company_name") &&
                    searchParams.get("sort")?.includes("Desc") ? (
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} size="sm" />
                    )}
                  </button>
                </th>
                <th className="w-[48%] pl-4 py-2.5 sm:w-auto sm:pl-0 font-semibold">
                  <button
                    onClick={() => handleSortClick("job_title")}
                    className={`flex items-center hover:text-secondary ${
                      searchParams.get("sort")?.includes("job_title") &&
                      "text-secondary"
                    }`}
                  >
                    <span className="mr-1">Job Title</span>
                    {searchParams.get("sort")?.includes("job_title") &&
                    searchParams.get("sort")?.includes("Desc") ? (
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} size="sm" />
                    )}
                  </button>
                </th>
                <th className="hidden py-2.5 font-semibold sm:table-cell">
                  <button
                    onClick={() => handleSortClick("salary_amount")}
                    className={`flex items-center hover:text-secondary ${
                      searchParams.get("sort")?.includes("salary_amount") &&
                      "text-secondary"
                    }`}
                  >
                    <span className="mr-1">Salary</span>
                    {searchParams.get("sort")?.includes("salary_amount") &&
                    searchParams.get("sort")?.includes("Desc") ? (
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
                      searchParams.get("sort")?.includes("username") &&
                      "text-secondary"
                    }`}
                  >
                    <span className="mr-1">Posted by</span>
                    {searchParams.get("sort")?.includes("username") &&
                    searchParams.get("sort")?.includes("Desc") ? (
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} size="sm" />
                    )}
                  </button>
                </th>
                <th className="w-12 py-2.5 font-semibold sm:w-auto">
                  <button
                    onClick={() => handleSortClick("created_at")}
                    className={`flex items-center hover:text-secondary ${
                      searchParams.get("sort")?.includes("created_at") &&
                      "text-secondary"
                    }`}
                  >
                    <span className="mr-1">Date</span>
                    {searchParams.get("sort")?.includes("created_at") &&
                    searchParams.get("sort")?.includes("Desc") ? (
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} size="sm" />
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.favorites.listings.length !== 0 &&
                userData.favorites.listings.map((listing: ListingType) => (
                  <tr
                    key={listing.id}
                    className="hover:bg-highlight text-sm sm:text-base"
                  >
                    <td className="py-2.5 pl-0 pr-1 sm:pl-2.5 sm:pr-0">
                      <FavoriteButton
                        listing={listing}
                        size="lg"
                        teamId={listing.teamId}
                      />
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
          {userData.favorites.listings.length === 0 && (
            <div className="p-4">
              <NullInfo message="You have no favorites." />
            </div>
          )}
        </div>
      </div>
      <Pagination count={userData.favorites.totalCount} />
    </>
  );
};

export const favoritesLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const favoritesParams = {
    sort: searchParams.get("sort"),
    search: searchParams.get("search"),
    page: searchParams.get("page"),
  };
  const userResponse = await axios.get("/api/users/user", {
    params: favoritesParams,
  });
  const userData = userResponse.data;
  return { userData };
};
