import { useLoaderData } from "react-router-dom";

const ListingDetails = () => {
  const { listing } = useLoaderData();

  return (
    <div className="flex flex-col gap-4 sm:w-7/12">
      <div>
        <p className="font-bold text-slate-400">JOB TITLE</p>
        <p>{listing.jobTitle}</p>
      </div>
      <div>
        <p className="font-bold text-slate-400">LINK TO APPLY</p>
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
        <p className="font-bold text-slate-400">COMPANY NAME</p>
        <p>{listing.companyName}</p>
      </div>
      <div>
        <p className="font-bold text-slate-400">COMPANY DETAILS</p>
        <p>{listing.companyDetails}</p>
      </div>
      <div>
        <p className="font-bold text-slate-400">JOB DESCRIPTION</p>
        <p>{listing.jobDescription}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
