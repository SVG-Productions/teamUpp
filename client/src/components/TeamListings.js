import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import formatDate from "../utils/formatDate";
import AddIcon from "./AddIcon";

const TeamListings = () => {
  const { team, listings } = useLoaderData();
  const navigate = useNavigate();

  const handleAddListing = () => {
    navigate(`/teams/${team.id}/create-listing`);
  };

  return (
    <div className="flex flex-col pb-6 sm:pb-0">
      <div className="flex justify-between">
        <p className="text-slate-400 font-bold pb-2 uppercase">
          {team.jobField} LISTINGS
        </p>
        <button
          onClick={handleAddListing}
          className="flex justify-center items-center w-6 h-6 rounded-full bg-slate-900 hover:bg-slate-400 text-white font-bold text-xl leading-5"
        >
          <AddIcon iconSize="10px" />
        </button>
      </div>
      {!listings.length && (
        <p className="text-center font-semibold p-4">
          No listings posted. Be the first to add one!
        </p>
      )}
      {listings.map((listing, index) => (
        <div
          key={index}
          className="flex flex-row justify-between bg-white rounded-sm px-2 py-2.5 hover:bg-blue-100"
        >
          <div className="flex flex-row items-center">
            <FavoriteButton listing={listing} />
            <div className="text-sm sm:text-lg font-bold">
              {listing.companyName}
            </div>
            <div className="font-bold mx-1 sm:block sm:text-lg">/</div>
            <NavLink
              to={`listings/${listing.id}/details`}
              className="text-sm sm:text-base sm:px-0 hover:underline"
            >
              {listing.jobTitle}
            </NavLink>
          </div>
          <div className="flex flex-row items-center">
            <div className="text-xs text-slate-400 sm:text-sm">
              {formatDate(listing.createdAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamListings;
