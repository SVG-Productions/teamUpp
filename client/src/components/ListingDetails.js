import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DeleteButton from "./DeleteButton";

const ListingDetails = ({ tabs, handleModal }) => {
  const { listing } = useLoaderData();
  const { authedUser } = useAuth();

  return (
    <div
      className={`flex flex-col gap-4 ${
        tabs !== "listing" && "hidden"
      } sm:flex`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-slate-400 text-lg font-bold uppercase sm:text-xl">
          {listing.jobTitle}
        </h2>
        {authedUser.id === listing.userId && (
          <DeleteButton
            onClick={() => handleModal(true)}
            fill="sm:hover:fill-slate-300"
          />
        )}
      </div>
      <div>
        <h3 className="font-bold text-slate-400">Company Name</h3>
        <p>{listing.companyName}</p>
      </div>
      <div>
        <h3 className="font-bold text-slate-400">Company Details</h3>
        <p>{listing.companyDetails}</p>
      </div>
      <div>
        <h3 className="font-bold text-slate-400">Job Description</h3>
        <p>{listing.jobDescription}</p>
      </div>
      <div>
        <h3 className="font-bold text-slate-400">Link to Apply</h3>
        <a
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
          href={`${listing.jobLink}`}
        >
          {listing.jobLink}
        </a>
      </div>
    </div>
  );
};

export default ListingDetails;
