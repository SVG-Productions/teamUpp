import React from "react";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { ListingType, UserType } from "../../type-definitions";
import NullInfo from "../components/NullInfo";
import Pagination from "../components/Pagination";
import { formatGeneralDate } from "../utils/dateFormatters";
import { formatSalary } from "../utils/formatSalary";

const AppsListPage = () => {
  const { userData } = useRouteLoaderData("apps") as { userData: UserType };

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
      <div className="flex flex-col self-center w-full pb-6 overflow-hidden sm:max-h-full sm:max-w-7xl sm:pb-8">
        <table className="w-full table-fixed sm:table-auto">
          <thead>
            <tr className="border-b border-borderprimary text-left text-sm">
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
              <th className="py-2.5 sm:w-auto sm:pl-0 font-semibold">
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
              <th className="w-24 py-2.5 sm:pl-0 sm:w-auto font-semibold">
                <button
                  onClick={() => handleSortClick("app_status")}
                  className={`flex items-center hover:text-secondary ${
                    searchParams.get("sort")?.includes("app_status") &&
                    "text-secondary"
                  }`}
                >
                  <span className="mr-1">Status</span>
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
            {userData?.applications.listings.length !== 0 &&
              userData?.applications.listings.map((listing: ListingType) => (
                <tr
                  key={listing.id}
                  className="hover:bg-highlight text-sm sm:text-base"
                >
                  <td className="py-2.5 truncate pr-1 sm:pr-0">
                    {listing.companyName}
                  </td>
                  <td className="py-2.5 truncate pr-1 sm:pr-0">
                    <button className="text-start w-full truncate text-blue-600 hover:underline">
                      {listing.jobTitle}
                    </button>
                  </td>
                  <td className="capitalize py-2.5 truncate pr-1 sm:pr-0">
                    {listing.appStatus}
                  </td>
                  <td className="hidden py-2.5 text-sm text-slate-400 pr-1 sm:pr-0 sm:table-cell">
                    {formatSalary(
                      listing.salaryAmount,
                      listing.salaryFrequency
                    )}
                  </td>
                  <td className="py-2.5 text-xs text-slate-400">
                    {formatGeneralDate(listing.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {userData?.applications.listings.length === 0 && (
          <div className="p-4">
            <NullInfo message="You have no favorites." />
          </div>
        )}
      </div>
      <Pagination count={`${userData.applications.listings.length}`} />
    </>
  );
};

export default AppsListPage;
