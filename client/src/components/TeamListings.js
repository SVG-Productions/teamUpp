import { NavLink, useLoaderData } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import formatDate from "../utils/formatDate";
import AddIcon from "./AddIcon";

const TeamListings = ({ handleModal }) => {
  const { team, listings } = useLoaderData();

  return (
    <div className="flex flex-col pb-6 sm:pb-0">
      <div className="flex justify-between">
        <h2 className="text-slate-400 font-bold pb-2 uppercase">
          {team.jobField} LISTINGS
        </h2>
        <button
          onClick={() => handleModal(true)}
          className="flex justify-center items-center w-6 h-6 rounded-full bg-slate-900 hover:bg-slate-400 text-white font-bold text-xl leading-5"
        >
          <AddIcon iconSize="10px" />
        </button>
      </div>
      <ul>
        {listings.length ? (
          listings.map((listing) => (
            <li
              key={listing.id}
              className="flex bg-white items-center rounded-sm hover:bg-blue-100 sm:px-2"
            >
              <FavoriteButton listing={listing} />
              <NavLink
                to={`listings/${listing.id}`}
                className="flex gap-2 py-2.5 items-center justify-between w-full overflow-hidden"
              >
                <div className="flex items-center overflow-hidden">
                  <p className="text-sm font-bold sm:text-lg">
                    {listing.companyName}
                  </p>
                  <p className="font-bold mx-1 sm:text-lg sm:mx-2">/</p>
                  <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap sm:text-base">
                    {listing.jobTitle}
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 sm:text-sm">
                  {formatDate(listing.createdAt)}
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
