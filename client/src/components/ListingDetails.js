import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DeleteButton from "./DeleteButton";
import PencilButton from "./PencilButton";
import { useState } from "react";

const ListingDetails = ({ tabs, handleModal }) => {
  const { listing } = useLoaderData();
  const { authedUser } = useAuth();
  const [searchParams, _] = useSearchParams();
  const [showEditInput, setShowEditInput] = useState("");
  const experienceId = searchParams.get("experience");

  return (
    <div
      className={`flex flex-col gap-4 pt-4 ${
        tabs !== "listing" && "hidden"
      } sm:flex sm:pt-0 ${experienceId && "sm:hidden"}`}
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
        <div className="flex justify-between sm:justify-start sm:gap-4">
          <h3 className="font-bold text-slate-400">Company Name</h3>
          {authedUser.id === listing.userId && <PencilButton />}
        </div>
        <p>{listing.companyName}</p>
      </div>
      <div>
        <div className="flex justify-between sm:justify-start sm:gap-4">
          <h3 className="font-bold text-slate-400">Company Details</h3>
          {authedUser.id === listing.userId && <PencilButton />}
        </div>
        <p>{listing.companyDetails}</p>
      </div>
      <div>
        <div className="flex justify-between sm:justify-start sm:gap-4">
          <h3 className="font-bold text-slate-400">Job Description</h3>
          {authedUser.id === listing.userId && <PencilButton />}
        </div>
        <p>{listing.jobDescription}</p>
      </div>
      <div>
        <div className="flex justify-between sm:justify-start sm:gap-4">
          <h3 className="font-bold text-slate-400">Link to Apply</h3>
          {authedUser.id === listing.userId && <PencilButton />}
        </div>
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
