import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";

export const DeleteListingPage = () => {
  const { listing } = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`/api/listings/${listing.id}`);
    navigate(`/teams/${listing.teamId}`);
  };

  return (
    <>
      <AuthedPageTitle>
        <NavLink to="/teams" className="hover:underline">
          Teams
        </NavLink>{" "}
        /{" "}
        <NavLink to={`/teams/${listing.teamId}`} className="hover:underline">
          {listing.teamName}
        </NavLink>{" "}
        /{" "}
        <NavLink
          to={`/teams/${listing.teamId}/listings/${listing.id}/details`}
          className="hover:underline"
        >
          {listing.companyName} - {listing.jobTitle}
        </NavLink>{" "}
        / <NavLink className="hover:underline">Delete</NavLink>
      </AuthedPageTitle>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center self-center sm:mt-0 mt-8 w-full px-16 py-24 max-w-xl">
          <p className="sm:text-2xl text-lg text-center">
            Are you sure you want to delete listing
            <br />
            <span className="font-bold">
              {listing.companyName} - {listing.jobTitle}
            </span>
            ?
          </p>
          <div className="flex justify-center sm:gap-12 gap-8 mt-32 w-full">
            <NavLink
              to={`/teams/${listing.teamId}/listings/${listing.id}/edit`}
              className="w-1/3 min-w-[84px] py-2 px-4 text-sm sm:text-base text-center border-2 border-emerald-500 hover:bg-emerald-200 font-bold text-emerald-500 rounded"
            >
              Cancel
            </NavLink>
            <button
              onClick={handleDelete}
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
  const { listingId, teamId } = params;
  const [listingData, teammatesData] = await Promise.all([
    axios.get(`/api/listings/${listingId}`),
    axios.get(`/api/teams/${teamId}/teammates`),
  ]);

  const listing = listingData.data;
  const teammates = teammatesData.data;

  return { listing, teammates };
};
