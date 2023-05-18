import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
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
          listings.map((listing, index) => (
            <li
              key={index}
              className="flex justify-between gap-2 items-center bg-white py-2.5 rounded-sm hover:bg-blue-100 sm:px-2"
            >
              <div className="flex items-center overflow-hidden">
                <FavoriteButton listing={listing} />
                <div className="text-sm sm:text-lg font-bold">
                  {listing.companyName}
                </div>
                <p className="sm:text-base font-bold mx-1 sm:mx-2">/</p>
                <NavLink
                  to={`listings/${listing.id}`}
                  className="text-sm sm:text-base hover:underline overflow-hidden overflow-ellipsis whitespace-nowrap"
                >
                  {listing.jobTitle}
                </NavLink>
              </div>
              <p className="text-[10px] text-slate-400 sm:text-sm">
                {formatDate(listing.createdAt)}
              </p>
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
