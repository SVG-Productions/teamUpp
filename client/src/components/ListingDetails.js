import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DeleteButton from "./DeleteButton";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";
import axios from "axios";
import useOnClickOutside from "../hooks/useOnClickOutside";

const ListingDetails = ({ tabs, handleModal }) => {
  const { listing } = useLoaderData();
  const { authedUser } = useAuth();
  const [searchParams, _] = useSearchParams();
  const [showEditInput, setShowEditInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [tempListing, setTempListing] = useState(listing);
  const editRef = useRef();

  const experienceId = searchParams.get("experience");

  const handleDeny = () => {
    setShowEditInput("");
    setEditInput("");
  };

  const handleAccept = async () => {
    const updatedListing = await axios.patch(`/api/listings/${listing.id}`, {
      [showEditInput]: editInput,
    });
    setTempListing(updatedListing.data);
    setShowEditInput("");
    setEditInput("");
  };

  useOnClickOutside(editRef, handleDeny);

  return (
    <div
      className={`flex flex-col gap-4 pt-4 ${
        tabs !== "listing" && "hidden"
      } sm:flex sm:pt-0 ${experienceId && "sm:hidden"}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-slate-400 text-lg font-bold uppercase sm:text-xl">
          {tempListing.jobTitle}
        </h2>
        {authedUser.id === tempListing.userId && (
          <DeleteButton
            onClick={() => handleModal(true)}
            fill="sm:hover:fill-slate-300"
          />
        )}
      </div>
      <div {...(showEditInput === "companyName" ? { ref: editRef } : {})}>
        <h3 className="font-bold text-slate-400">Company Name</h3>
        {showEditInput === "companyName" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 
            whitespace-nowrap overflow-hidden sm:w-2/5 sm:min-w-[200px]"
            html={editInput}
          />
        ) : (
          <p className="px-1 border-2 border-white">
            {tempListing.companyName}
          </p>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== tempListing.userId && "hidden"
          }  sm:w-2/5 sm:min-w-[200px]`}
        >
          <button
            onClick={() => {
              setEditInput(tempListing.companyName);
              setShowEditInput("companyName");
            }}
            className={`text-xs font-bold hover:text-red-900 ${
              showEditInput === "companyName"
                ? "text-red-900"
                : "text-slate-600"
            }`}
          >
            edit
          </button>
          {showEditInput === "companyName" && (
            <div className="flex self-start items-center">
              <AcceptButton onClick={handleAccept} />
              <DenyButton onClick={handleDeny} />
            </div>
          )}
        </div>
      </div>
      <div {...(showEditInput === "companyDetails" ? { ref: editRef } : {})}>
        <h3 className="font-bold text-slate-400">Company Details</h3>
        {showEditInput === "companyDetails" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words"
            html={editInput}
          />
        ) : (
          <p className="px-1 border-2 border-white">
            {tempListing.companyDetails}
          </p>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== tempListing.userId && "hidden"
          }`}
        >
          <button
            onClick={() => {
              setEditInput(tempListing.companyDetails);
              setShowEditInput("companyDetails");
            }}
            className={`text-xs font-bold hover:text-red-900 ${
              showEditInput === "companyDetails"
                ? "text-red-900"
                : "text-slate-600"
            }`}
          >
            edit
          </button>
          {showEditInput === "companyDetails" && (
            <div className="flex self-start items-center">
              <AcceptButton onClick={handleAccept} />
              <DenyButton onClick={handleDeny} />
            </div>
          )}
        </div>
      </div>
      <div {...(showEditInput === "jobDescription" ? { ref: editRef } : {})}>
        <h3 className="font-bold text-slate-400">Job Description</h3>
        {showEditInput === "jobDescription" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words"
            html={editInput}
          />
        ) : (
          <p className="px-1 border-2 border-white">
            {tempListing.jobDescription}
          </p>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== tempListing.userId && "hidden"
          }`}
        >
          <button
            onClick={() => {
              setEditInput(tempListing.jobDescription);
              setShowEditInput("jobDescription");
            }}
            className={`text-xs font-bold hover:text-red-900 ${
              showEditInput === "jobDescription"
                ? "text-red-900"
                : "text-slate-600"
            }`}
          >
            edit
          </button>
          {showEditInput === "jobDescription" && (
            <div className="flex self-start items-center">
              <AcceptButton onClick={handleAccept} />
              <DenyButton onClick={handleDeny} />
            </div>
          )}
        </div>
      </div>
      <div {...(showEditInput === "jobLink" ? { ref: editRef } : {})}>
        <h3 className="font-bold text-slate-400">Link to Apply</h3>
        {showEditInput === "jobLink" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 
            whitespace-nowrap overflow-hidden sm:w-2/5 sm:min-w-[200px]"
            html={editInput}
          />
        ) : (
          <a
            className="px-1 border-2 border-white hover:underline"
            target="_blank"
            rel="noreferrer"
            href={`${tempListing.jobLink}`}
          >
            {tempListing.jobLink}
          </a>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== tempListing.userId && "hidden"
          }  sm:w-2/5 sm:min-w-[200px]`}
        >
          <button
            onClick={() => {
              setEditInput(tempListing.jobLink);
              setShowEditInput("jobLink");
            }}
            className={`text-xs font-bold hover:text-red-900 ${
              showEditInput === "jobLink" ? "text-red-900" : "text-slate-600"
            }`}
          >
            edit
          </button>
          {showEditInput === "jobLink" && (
            <div className="flex self-start items-center">
              <AcceptButton onClick={handleAccept} />
              <DenyButton onClick={handleDeny} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
