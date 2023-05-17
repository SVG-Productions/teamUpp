import { useLoaderData } from "react-router-dom";

const ListingDetails = () => {
  const { listing } = useLoaderData();

  return (
    <div className="flex flex-col gap-4 sm:w-7/12">
      <p className="text-slate-400 text-lg font-bold hidden sm:block">
        LISTING DETAILS
      </p>
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
