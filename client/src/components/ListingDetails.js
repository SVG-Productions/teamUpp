import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PencilButton from "./PencilButton";

const ListingDetails = () => {
  const { team } = useLoaderData();
  const { listing } = useLoaderData();
  const { authedUser } = useAuth();

  return (
    <div className="flex flex-col gap-4 sm:w-7/12">
      <div className="hidden justify-between sm:flex">
        <p className="text-slate-400 text-lg font-bold">LISTING DETAILS</p>
        {authedUser.id === listing.userId && (
          <PencilButton
            styling="w-8 h-8 bg-slate-900"
            href={`/teams/${team.id}/listings/${listing.id}/edit`}
          />
        )}
      </div>
      <div>
        <p className="font-bold text-slate-400">Job Title</p>
        <p>{listing.jobTitle}</p>
      </div>
      <div>
        <p className="font-bold text-slate-400">Link to Apply</p>
        <a
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
          href={`${listing.jobLink}`}
        >
          {listing.jobLink}
        </a>
      </div>
      <div>
        <p className="font-bold text-slate-400">Company Name</p>
        <p>{listing.companyName}</p>
      </div>
      <div>
        <p className="font-bold text-slate-400">Company Details</p>
        <p>{listing.companyDetails}</p>
      </div>
      <div>
        <p className="font-bold text-slate-400">Job Description</p>
        <p>{listing.jobDescription}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
