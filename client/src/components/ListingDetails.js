import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DeleteButton from "./DeleteButton";
import PencilButton from "./PencilButton";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

const ListingDetails = ({ tabs, handleModal }) => {
  const { listing } = useLoaderData();
  const { authedUser } = useAuth();
  const [searchParams, _] = useSearchParams();
  const [showEditInput, setShowEditInput] = useState("");
  const [editInput, setEditInput] = useState("");

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
        <div className="flex gap-2 items-center sm:gap-4">
          <h3 className="font-bold text-slate-400">Company Name</h3>
        </div>
        {showEditInput === "companyName" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words 
            sm:w-2/5 sm:min-w-[200px]"
            html={editInput}
          />
        ) : (
          <p className="px-1 border-2 border-white">{listing.companyName}</p>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== listing.userId && "hidden"
          }`}
        >
          <div className="text-xs text-slate-600 font-bold">
            <button
              onClick={() => {
                setEditInput(listing.companyName);
                setShowEditInput("companyName");
              }}
              className={`hover:text-red-900 ${
                showEditInput === "companyName" && "text-red-900"
              }`}
            >
              edit
            </button>
          </div>
          {/* {(showEditCommentInput || showDeleteConfirmation) &&
            commentId === comment.id && (
              <div
                className="flex self-start items-center"
                {...deleteReference}
              >
                <AcceptButton onClick={() => handleAccept(comment.id)} />
                <DenyButton onClick={handleDeny} />
              </div>
            )} */}
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center sm:gap-4">
          <h3 className="font-bold text-slate-400">Company Details</h3>
        </div>
        {showEditInput === "companyDetails" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words"
            html={editInput}
          />
        ) : (
          <p className="px-1 border-2 border-white">{listing.companyDetails}</p>
        )}
        <div className="text-xs text-slate-600 font-bold">
          <button
            onClick={() => {
              setEditInput(listing.companyDetails);
              setShowEditInput("companyDetails");
            }}
            className={`hover:text-red-900 ${
              showEditInput === "companyDetails" && "text-red-900"
            }`}
          >
            edit
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center sm:gap-4">
          <h3 className="font-bold text-slate-400">Job Description</h3>
        </div>
        {showEditInput === "jobDescription" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words"
            html={editInput}
          />
        ) : (
          <p className="px-1 border-2 border-white">{listing.jobDescription}</p>
        )}
        <div className="text-xs text-slate-600 font-bold">
          <button
            onClick={() => {
              setEditInput(listing.jobDescription);
              setShowEditInput("jobDescription");
            }}
            className={`hover:text-red-900 ${
              showEditInput === "jobDescription" && "text-red-900"
            }`}
          >
            edit
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center sm:gap-4">
          <h3 className="font-bold text-slate-400">Link to Apply</h3>
        </div>
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
            href={`${listing.jobLink}`}
          >
            {listing.jobLink}
          </a>
        )}
        <div className="text-xs text-slate-600 font-bold">
          <button
            onClick={() => {
              setEditInput(listing.jobLink);
              setShowEditInput("jobLink");
            }}
            className={`hover:text-red-900 ${
              showEditInput === "jobLink" && "text-red-900"
            }`}
          >
            edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
