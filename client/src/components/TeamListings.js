import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import ScrollableList from "./ScrollableList";
import FavoriteButton from "./FavoriteButton";
import formatDate from "../utils/formatDate";
import DropdownMenuButton from "./DropdownMenuButton";

const TeamListings = () => {
  const { team, listings } = useLoaderData();
  const navigate = useNavigate();

  const handleAddListing = () => {
    navigate(`/teams/${team.id}/create-listing`);
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:pl-12 sm:pt-8">
      <p className="text-slate-400 font-bold">LISTINGS</p>
      {listings.map((listing, index) => (
        <div
          key={index}
          className="flex flex-row justify-between bg-white rounded-md"
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
