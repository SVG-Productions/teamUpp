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
    <ScrollableList
      title="Team Listings"
      hasAddButton={true}
      onClick={handleAddListing}
    >
      {listings.map((listing, index) => (
        <div key={index} className="flex flex-row bg-white p-2.5 rounded-md">
          <div className="flex flex-row w-2/3 items-center">
            <FavoriteButton listing={listing} />
            <div className="text-xs sm:text-lg font-bold">
              {listing.companyName}
            </div>
            <div className="hidden sm:block sm:text-lg font-bold mx-2">/</div>
            <NavLink
              to={`listings/${listing.id}/details`}
              className="text-xs sm:text-base px-3 sm:px-0 hover:underline"
            >
              {listing.jobTitle}
            </NavLink>
          </div>
          <div className="flex flex-row justify-end w-1/3 items-center">
            <div className="text-xs sm:text-sm">
              {formatDate(listing.createdAt)}
            </div>
            <DropdownMenuButton />
          </div>
        </div>
      ))}
    </ScrollableList>
  );
};

export default TeamListings;
