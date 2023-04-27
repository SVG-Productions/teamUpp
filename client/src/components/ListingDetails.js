import { useLoaderData } from "react-router-dom";

const ListingDetails = () => {
  const { listing } = useLoaderData();

  return (
    <div
      className="flex flex-col sm:flex-row pt-1 sm:min-h-[350px] sm:max-h-[350px]
rounded-md w-auto bg-slate-100 shadow"
    >
      <div
        className="flex flex-col gap-4 h-full w-full sm:w-1/2 sm:border-8
    sm:border-transparent sm:border-r-2 sm:border-r-black p-4 sm:overflow-y-scroll"
      >
        <div>
          <p className="font-bold">Job Title:</p>
          <p>{listing.jobTitle}</p>
        </div>
        <div>
          <p className="font-bold">Link to Apply:</p>
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
          <p className="font-bold">Company Name:</p>
          <p>{listing.companyName}</p>
        </div>
        <div>
          <p className="font-bold">Company Details:</p>
          <p>{listing.companyDetails}</p>
        </div>
      </div>
      <div
        className="h-full w-full sm:w-1/2 sm:border-8 sm:border-transparent
  sm:border-l-2 sm:border-l-black px-4 pb-4 sm:p-4"
      >
        <p className="font-bold">Job Description:</p>
        <p>{listing.jobDescription}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
