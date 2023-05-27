import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
  faTrashCan,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import useOnClickOutside from "../hooks/useOnClickOutside";
import trimUrl from "../utils/trimUrl";

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
          {tempListing.jobTitle} - {tempListing.companyName}
        </h2>
        {authedUser.id === tempListing.userId && (
          <FontAwesomeIcon
            icon={faTrashCan}
            className="cursor-pointer text-slate-900 hover:text-slate-400 mr-2"
            size="xl"
            onClick={() => handleModal(true)}
          />
        )}
      </div>
      <div {...(showEditInput === "companyDetails" ? { ref: editRef } : {})}>
        <h3 className="font-bold text-slate-400">
          About {tempListing.companyName}
        </h3>
        {showEditInput === "companyDetails" ? (
          <ReactQuill
            value={editInput}
            onChange={setEditInput}
            modules={basicModules}
            theme="snow"
          />
        ) : (
          <div className="px-2 py-1 border-l-2 mb-1">
            {parse(tempListing.companyDetails)}
          </div>
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
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="lg"
                className="text-slate-900 cursor-pointer hover:text-green-500"
                onClick={handleAccept}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-slate-900 cursor-pointer hover:text-red-500"
                onClick={handleDeny}
              />
            </div>
          )}
        </div>
      </div>
      <div {...(showEditInput === "jobDescription" ? { ref: editRef } : {})}>
        <h3 className="font-bold text-slate-400">Job Description</h3>
        {showEditInput === "jobDescription" ? (
          <ReactQuill
            value={editInput}
            onChange={setEditInput}
            modules={basicModules}
            theme="snow"
          />
        ) : (
          <div className="px-2 py-1 border-l-2 mb-1">
            {parse(tempListing.jobDescription)}
          </div>
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
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="lg"
                className="text-slate-900 cursor-pointer hover:text-green-500"
                onClick={handleAccept}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-slate-900 cursor-pointer hover:text-red-500"
                onClick={handleDeny}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="w-full sm:w-3/5 sm:min-w-[300px]"
        {...(showEditInput === "jobLink" ? { ref: editRef } : {})}
      >
        <h3 className="font-bold text-slate-400">Link to Apply</h3>
        {showEditInput === "jobLink" ? (
          <ContentEditable
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 
            whitespace-nowrap overflow-hidden"
            html={editInput}
          />
        ) : (
          <a
            className="flex no-underline items-center px-1 border-2 border-white hover:underline truncate"
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
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== tempListing.userId && "hidden"
          }`}
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
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="lg"
                className="text-slate-900 cursor-pointer hover:text-green-500"
                onClick={handleAccept}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-slate-900 cursor-pointer hover:text-red-500"
                onClick={handleDeny}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
