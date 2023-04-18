import { NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";

export const DeleteListingPage = () => {
  const { data } = useLoaderData();

  return (
    <>
      <AuthedPageTitle>
        <NavLink to="/teams" className="hover:underline">
          Teams
        </NavLink>{" "}
        /{" "}
        <NavLink to={`/teams/${data.teamId}`} className="hover:underline">
          {data.teamName}
        </NavLink>{" "}
        /{" "}
        <NavLink
          to={`/teams/${data.teamId}/listings/${data.id}/details`}
          className="hover:underline"
        >
          {data.companyName} - {data.jobTitle}
        </NavLink>{" "}
        / <NavLink className="hover:underline">Delete</NavLink>
      </AuthedPageTitle>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center self-center sm:mt-0 mt-8 w-full px-16 py-24 max-w-xl">
          <p className="sm:text-2xl text-lg text-center">
            Are you sure you want to delete listing
            <br />
            <span className="font-bold">
              {data.companyName} - {data.jobTitle}
            </span>
            ?
          </p>
          <div className="flex justify-center sm:gap-12 gap-8 mt-32 w-full">
            <NavLink
              to={`/teams/${data.teamId}/listings/${data.id}/edit`}
              className="w-1/3 min-w-[84px] py-2 px-4 text-sm sm:text-base text-center border-2 border-emerald-500 hover:bg-emerald-200 font-bold text-emerald-500 rounded"
            >
              Cancel
            </NavLink>
            <button
              className="w-1/3 min-w-[84px] py-2 px-4 text-sm sm:text-base text-center border-2 border-red-500 hover:bg-red-200 font-bold text-red-500 rounded"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const deleteListingLoader = async ({ request, params }) => {
  const { listingId } = params;
  const listingData = await axios.get(`/api/listings/${listingId}`);
  return listingData;
};
