import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PencilButton from "./PencilButton";

const ListingDetails = ({ tabs }) => {
  const { team } = useLoaderData();
  const { listing } = useLoaderData();
  const { authedUser } = useAuth();

  return (
    <div
      className={`flex flex-col gap-4 ${
        tabs !== "listing" && "hidden"
      } sm:flex`}
    >
      <div className="hidden justify-between sm:flex">
        <h2 className="text-slate-400 text-lg font-bold sm:text-xl">
          LISTING DETAILS
        </h2>
        {authedUser.id === listing.userId && (
          <PencilButton
            styling="w-8 h-8 bg-slate-900"
            href={`/teams/${team.id}/listings/${listing.id}/edit`}
          />
        )}
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-slate-400">Job Title</h3>
          <p>{listing.jobTitle}</p>
        </div>
        <div className="sm:hidden">
          {authedUser.id === listing.userId && (
            <PencilButton
              styling="w-8 h-8 bg-slate-900"
              href={`/teams/${team.id}/listings/${listing.id}/edit`}
            />
          )}
        </div>
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
    </div>
  );
};

export default ListingDetails;
