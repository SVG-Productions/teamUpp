import { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faStar,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import sortListings from "../utils/sortListings";
import NullInfo from "./NullInfo";

const TeamListings = ({ handleModal }) => {
  const { teamData } = useLoaderData();

  const [sortBy, setSortBy] = useState("date");
  const [isSortDown, setIsSortDown] = useState(true);

  const sortedListings = sortListings(teamData.listings, sortBy, isSortDown);

  const handleSortClick = (sortByCategory) => {
    if (sortByCategory === sortBy) {
      setIsSortDown(!isSortDown);
    } else {
      setSortBy(sortByCategory);
      setIsSortDown("down");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between border-b pb-2 border-borderprimary items-center">
        <h1 className="capitalize text-headingColor font-semibold">
          {teamData.jobField} listings
        </h1>
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="xl"
          className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
          onClick={() => handleModal(true)}
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
            <th className="w-[48%] py-2.5 sm:w-auto font-semibold">
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
              Salary
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
          {sortedListings.length ? (
            sortedListings.map((listing) => (
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
                <td className="py-2.5 truncate pr-1 sm:pr-0 sm:whitespace-normal">
                  <NavLink
                    to={`/teams/${listing.teamId}/listings/${listing.id}`}
                  >
                    {listing.jobTitle}
                  </NavLink>
                </td>
                <td className="hidden py-2.5 text-sm text-slate-400 pr-1 sm:pr-0 sm:table-cell">
                  coming soon...
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
  );
};

export default TeamListings;
