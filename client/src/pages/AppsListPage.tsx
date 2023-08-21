import React, { useState } from "react";
import {
  faArrowDown,
  faArrowUp,
  faBriefcase,
  faBuilding,
  faCalendar,
  faFolder,
  faSackDollar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Params, useLoaderData, useSearchParams } from "react-router-dom";
import { ListingType, UserType } from "../../type-definitions";
import NullInfo from "../components/NullInfo";
import Pagination from "../components/Pagination";
import { formatGeneralDate } from "../utils/dateFormatters";
import { formatSalary } from "../utils/formatSalary";
import axios from "axios";

export const AppsListPage = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  const applicationColumns = userData.applications.boardApps.columns;
  const [searchInput, setSearchInput] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

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

  return (
    <>
      <div className="flex flex-col self-center w-full sm:max-h-full sm:max-w-7xl">
        <div className="flex mb-4 gap-4">
          <div
            className="flex items-center border border-borderprimary rounded py-2 px-3 
          leading-tight focus-within:border-blue-600 sm:w-52"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full outline-none text-sm"
              placeholder="Search this list"
              autoFocus
            />
            <button>
              <FontAwesomeIcon icon={faSearch} className="text-tertiary" />
            </button>
          </div>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            className="bg-primary border border-borderprimary rounded text-sm text-tertiary py-2 px-3 capitalize"
          >
            <option value="">Filter by status...</option>
            {Object.keys(applicationColumns).map((key) => (
              <option
                key={key}
                value={applicationColumns[key].title}
                className="normal-case"
              >
                {applicationColumns[key].title}
              </option>
            ))}
          </select>
        </div>
        <table className="w-full table-fixed sm:table-auto">
          <thead>
            <tr className="border-b border-borderprimary text-left text-sm">
              <th className="py-2.5 pl-2 font-semibold truncate">
                <button
                  onClick={() => handleSortClick("company_name")}
                  className={`flex gap-1 items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("company_name") &&
                    "text-secondary"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="text-violet-500 mr-1"
                  />
                  <span className="hidden sm:block">Company</span>
                  {searchParams.get("sort")?.includes("company_name") &&
                  searchParams.get("sort")?.includes("Desc") ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="py-2.5 sm:w-auto sm:pl-0 font-semibold">
                <button
                  onClick={() => handleSortClick("job_title")}
                  className={`flex gap-1 items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("job_title") &&
                    "text-secondary"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-green-500 mr-1"
                  />
                  <span className="hidden sm:block">Job Title</span>
                  {searchParams.get("sort")?.includes("job_title") &&
                  searchParams.get("sort")?.includes("Desc") ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </button>
              </th>
              <th className="w-24 py-2.5 sm:pl-0 sm:w-auto font-semibold">
                <button
                  onClick={() => handleSortClick("app_status")}
                  className={`flex gap-1 items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("app_status") &&
                    "text-secondary"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="text-orange-500 mr-1"
                  />
                  <span className="hidden sm:block">Status</span>
                  {searchParams.get("sort")?.includes("app_status") &&
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
                  className={`flex gap-1 items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("salary_amount") &&
                    "text-secondary"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="text-yellow-500 mr-1"
                  />
                  <span>Salary</span>
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
                  className={`flex gap-1 items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("created_at") &&
                    "text-secondary"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-red-500 mr-1"
                  />
                  <span className="hidden sm:block">Date</span>
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
            {userData?.applications.listings.length !== 0 &&
              userData?.applications.listings.map((listing: ListingType) => (
                <tr
                  key={listing.id}
                  className="hover:bg-highlight text-sm sm:text-base"
                >
                  <td className="py-2.5 pl-2 truncate font-medium pr-1 sm:pr-0">
                    {listing.companyName}
                  </td>
                  <td className="py-2.5 truncate pr-1 sm:pr-0">
                    <button className="text-start w-full truncate text-blue-600 hover:underline">
                      {listing.jobTitle}
                    </button>
                  </td>
                  <td className="capitalize text-sm text-slate-400 py-2.5 truncate pr-1 sm:pr-0">
                    {listing.appStatus}
                  </td>
                  <td className="hidden py-2.5 text-sm text-slate-400 pr-1 sm:pr-0 sm:table-cell">
                    {formatSalary(
                      listing.salaryAmount,
                      listing.salaryFrequency
                    )}
                  </td>
                  <td className="py-2.5 text-xs text-slate-400 sm:text-sm">
                    {formatGeneralDate(listing.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {userData?.applications.listings.length === 0 && (
          <div className="p-4">
            <NullInfo message="You have no applications." />
          </div>
        )}
      </div>
      <Pagination count={`${userData.applications.listings.length}`} />
    </>
  );
};

export const appsListLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const appsListParams = {
    sort: searchParams.get("sort"),
    search: searchParams.get("search"),
    page: searchParams.get("page"),
  };
  const userResponse = await axios.get("/api/users/user", {
    params: appsListParams,
  });
  const userData = userResponse.data;
  return { userData };
};
