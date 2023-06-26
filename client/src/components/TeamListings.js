import { useState } from "react";
import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
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
import { formatSalary } from "../utils/formatSalary";
import NullInfo from "./NullInfo";

const TeamListings = ({ handleModal }) => {
  const { teamData } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "created_atDesc",
  });

  const handleSortClick = (sortByCategory) => {
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
            <th className="py-2.5 pr-2 font-semibold">
              <button
                onClick={() => handleSortClick("company_name")}
                className={`flex w-full items-center hover:text-secondary ${
                  searchParams.get("sort")?.includes("company_name") &&
                  "text-secondary"
                }`}
              >
                <span className="mr-1 truncate">Company</span>
                {searchParams.get("sort")?.includes("company_name") &&
                searchParams.get("sort")?.includes("Desc") ? (
                  <FontAwesomeIcon icon={faArrowUp} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} size="sm" />
                )}
              </button>
            </th>
            <th className="w-[48%] py-2.5 sm:w-auto font-semibold">
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
          {teamData.listings.length !== 0 &&
            teamData.listings.map((listing) => (
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
                  {formatSalary(listing.salaryAmount, listing.salaryFrequency)}
                </td>
                <td className="py-2.5 pr-2.5 text-xs text-slate-400">
                  {formatGeneralDate(listing.createdAt)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {teamData.listings.length === 0 && (
        <div className="p-4">
          <NullInfo message="No listings. Be the first to add one!" />
        </div>
      )}
    </div>
  );
};

export default TeamListings;
