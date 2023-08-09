import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import useOnClickOutside from "../hooks/useOnClickOutside";
import trimUrl from "../utils/trimUrl";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { ListingType } from "../../type-definitions";

const ListingDetails = ({
  tabs,
  handleModal,
}: {
  tabs: string;
  handleModal: (bool: boolean) => void;
}) => {
  const { listingData } = useLoaderData() as { listingData: ListingType };
  const { authedUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [showEditInput, setShowEditInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [tempListing, setTempListing] = useState(listingData);
  const editRef = useRef<HTMLDivElement & HTMLFormElement>(null);

  const experienceId = searchParams.get("experience");

  const handleDeny = () => {
    setShowEditInput("");
    setEditInput("");
  };

  const handleAccept = async (event?: React.FormEvent<HTMLFormElement>) => {
    try {
      if (event) {
        event.preventDefault();
      }
      const updatedListing = await axios.patch(
        `/api/listings/${listingData.id}`,
        {
          [showEditInput]: editInput,
        }
      );
      setTempListing(updatedListing.data);
      setShowEditInput("");
      setEditInput("");
      toast.success("Listing successfully updated!", basicToast);
    } catch (error) {
      toast.error("Oops! Something went wrong!", basicToast);
    }
  };

  useOnClickOutside(editRef, handleDeny);

  return (
    <div
      className={`flex flex-col gap-4 pt-4 ${
        tabs !== "listing" && "hidden"
      } sm:flex sm:pt-0 ${experienceId && "sm:hidden"}`}
    >
      <div {...(showEditInput === "companyDetails" ? { ref: editRef } : {})}>
        <h2 className="font-semibold text-headingColor border-b border-borderprimary">
          About {tempListing.companyName}
        </h2>
        <div className="px-2 py-1 mb-1">
          {showEditInput === "companyDetails" ? (
            <ReactQuill
              value={editInput}
              onChange={setEditInput}
              modules={basicModules}
              theme="snow"
            />
          ) : (
            parse(tempListing.companyDetails)
          )}
        </div>
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser?.id !== tempListing.userId && "hidden"
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
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-green-500"
                onClick={() => handleAccept()}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-red-500"
                onClick={handleDeny}
              />
            </div>
          )}
        </div>
      </div>
      <div {...(showEditInput === "jobDescription" ? { ref: editRef } : {})}>
        <h2 className="font-semibold text-headingColor border-b border-borderprimary">
          Job Description
        </h2>
        <div className="px-2 py-1 mb-1">
          {showEditInput === "jobDescription" ? (
            <ReactQuill
              value={editInput}
              onChange={setEditInput}
              modules={basicModules}
              theme="snow"
            />
          ) : (
            parse(tempListing.jobDescription)
          )}
        </div>
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser?.id !== tempListing.userId && "hidden"
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
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-green-500"
                onClick={() => handleAccept()}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-red-500"
                onClick={handleDeny}
              />
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={(e) => handleAccept(e)}
        className="w-full sm:w-3/5 sm:min-w-[300px]"
        {...(showEditInput === "jobLink" ? { ref: editRef } : {})}
      >
        <h2 className="font-semibold text-headingColor border-b border-borderprimary">
          Link to Apply
        </h2>
        <div className="px-2 py-1 mb-1">
          {showEditInput === "jobLink" ? (
            <input
              className="px-1 w-full text-primary bg-secondary border-2 rounded border-blue-600 
            whitespace-nowrap overflow-hidden"
              type="url"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
          ) : (
            <a
              className="flex no-underline items-center border-2 border-transparent hover:underline truncate"
              target="_blank"
              rel="noreferrer"
              href={`${tempListing.jobLink}`}
            >
              <div className="truncate">{trimUrl(tempListing.jobLink)}</div>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                size="xs"
                className="ml-2 text-slate-600"
              />
            </a>
          )}
        </div>
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser?.id !== tempListing.userId && "hidden"
          }`}
        >
          <button
            onClick={() => {
              setEditInput(tempListing.jobLink);
              setShowEditInput("jobLink");
            }}
            type="button"
            className={`text-xs font-bold hover:text-red-900 ${
              showEditInput === "jobLink" ? "text-red-900" : "text-slate-600"
            }`}
          >
            edit
          </button>
          {showEditInput === "jobLink" && (
            <div className="flex items-center gap-1 mt-1">
              <button>
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  size="lg"
                  className="text-iconPrimary cursor-pointer hover:text-green-500"
                />
              </button>
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-red-500"
                onClick={handleDeny}
              />
            </div>
          )}
        </div>
      </form>
      {authedUser?.id === listingData.userId && (
        <button
          className="self-end font-semibold text-sm mt-8 p-2 px-4 rounded-md bg-secondary text-red-400
            border border-slate-400 hover:border-slate-600 hover:bg-highlight"
          onClick={() => handleModal(true)}
        >
          Delete listing
        </button>
      )}
    </div>
  );
};

export default ListingDetails;
