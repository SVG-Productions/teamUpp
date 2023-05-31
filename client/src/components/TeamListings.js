import { NavLink, useLoaderData } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { formatGeneralDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const TeamListings = ({ handleModal }) => {
  const { teamData } = useLoaderData();

  return (
    <div className="flex flex-col pb-6 sm:pb-0">
      <div className="flex justify-between">
        <h2 className="text-headingColor font-bold pb-2 uppercase">
          {teamData.jobField} LISTINGS
        </h2>
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="xl"
          className="cursor-pointer text-buttonPrimary hover:text-slate-500"
          onClick={() => handleModal(true)}
        />
      </div>
      <ul>
        {teamData.listings.length ? (
          teamData.listings.map((listing) => (
            <li
              key={listing.id}
              className="flex items-center rounded-sm hover:bg-highlight sm:px-2"
            >
              <FavoriteButton listing={listing} size="xl" />
              <NavLink
                to={`listings/${listing.id}`}
                className="flex no-underline text-primary ml-2 gap-2 py-2.5 items-center justify-between w-full overflow-hidden"
              >
                <div className="flex items-center overflow-hidden">
                  <p className="text-sm font-bold sm:text-lg">
                    {listing.companyName}
                  </p>
                  <p className="font-bold mx-1 sm:text-lg sm:mx-2">/</p>
                  <p className="text-sm truncate sm:text-base">
                    {listing.jobTitle}
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 sm:text-sm">
                  {formatGeneralDate(listing.createdAt)}
                </p>
              </NavLink>
            </li>
          ))
        ) : (
          <p className="text-center font-semibold p-4">
            No listings posted. Be the first to add one!
          </p>
        )}
      </ul>
    </div>
  );
};

export default TeamListings;
