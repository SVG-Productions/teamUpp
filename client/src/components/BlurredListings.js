import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import formatDate from "../utils/formatDate";
import AddIcon from "./AddIcon";
import RequestToJoinForm from "./RequestToJoinForm";

const listings = [
  {
    companyName: "Netflix",
    jobTitle: "Front-End Developer",
    isFavorite: true,
    date: "5/12/23",
  },
  {
    companyName: "Google",
    jobTitle: "Front-End Developer",
    isFavorite: false,
    date: "5/12/23",
  },
  {
    companyName: "Facebook",
    jobTitle: "Software Engineer",
    isFavorite: true,
    date: "5/12/23",
  },
  {
    companyName: "Twitter",
    jobTitle: "Front-End Developer",
    isFavorite: true,
    date: "5/12/23",
  },
  {
    companyName: "Netflix",
    jobTitle: "Back-End Developer",
    isFavorite: false,
    date: "5/12/23",
  },
  {
    companyName: "Big Tech Corp.",
    jobTitle: "Software Engineer",
    isFavorite: true,
    date: "5/12/23",
  },
];

const BlurredListings = () => {
  const { team } = useLoaderData();
  const navigate = useNavigate();

  const handleAddListing = () => {
    navigate(`/teams/${team.id}/create-listing`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="text-slate-400 font-bold pb-2 uppercase">
          {team.jobField} LISTINGS
        </p>
        <button
          onClick={handleAddListing}
          className="flex justify-center items-center w-6 h-6 rounded-full bg-slate-400 text-white font-bold text-xl leading-5 cursor-not-allowed"
          disabled
        >
          <AddIcon iconSize="10px" />
        </button>
      </div>
      <div className="relative">
        <div className="absolute border-4 w-full h-full flex flex-col items-center rounded-sm z-10 backdrop-blur-sm">
          <p className="font-bold pb-2">Join {team.name} to view listings!</p>
          <RequestToJoinForm />
        </div>
        {listings.map((listing, index) => (
          <div
            key={index}
            className="flex flex-row justify-between px-2 py-2.5"
          >
            <div className="flex flex-row items-center">
              <div
                className={`w-8 h-8 rounded-full text-2xl ${
                  listing.isFavorite ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                &#9733;
              </div>
              <p className="text-sm sm:text-lg font-bold">
                {listing.companyName}
              </p>
              <p className="font-bold mx-1 sm:block sm:text-lg">/</p>
              <p className="text-sm sm:text-base sm:px-0">{listing.jobTitle}</p>
            </div>
            <div className="text-xs text-slate-400 sm:text-sm">
              {listing.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlurredListings;
