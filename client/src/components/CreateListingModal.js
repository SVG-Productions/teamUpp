import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";

const CreateListingModal = ({ handleModal }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const { authedUser } = useAuth();
  const userId = authedUser.id;

  const { team } = useLoaderData();
  const { id: teamId } = team;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listingData = {
      jobTitle,
      jobLink,
      companyName,
      companyDetails,
      jobDescription,
      teamId,
      userId,
    };
    const {
      data: { id },
    } = await axios.post("/api/listings", listingData);
    navigate(`/teams/${teamId}/listings/${id}/details`);
  };
  return (
    <div className="fixed inset-0 top-[64px] z-20 overflow-y-auto">
      <div className="flex items-center w-full justify-center h-full">
        <div
          className="sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75 
          sm:transition-opacity"
          onClick={() => handleModal(false)}
        ></div>
        <div className="fixed inset-0 bg-white top-[64px] sm:hidden"></div>

        <div
          className="flex flex-col bg-white h-full w-full max-w-xl rounded-sm z-10 
          sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
        >
          <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
            CREATE LISTING
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 sm:max-w-md sm:self-center"
          >
            <FormField
              label="JOB TITLE"
              id="jobTitle"
              type="text"
              placeholder="Enter job title..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <FormField
              label="APPLICATION LINK"
              id="link"
              type="url"
              placeholder="Enter link to application..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
            <FormField
              label="COMPANY NAME"
              id="companyName"
              type="text"
              placeholder="Enter company name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <FormField
              label="COMPANY DETAILS"
              id="companyDetails"
              type="text"
              placeholder="Enter company details..."
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
            />
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="block font-bold text-slate-400 mb-2 text-sm"
              >
                JOB DESCRIPTION
              </label>
              <textarea
                id="description"
                rows="8"
                cols="50"
                placeholder="Enter job description..."
                className="border border-slate-900 rounded w-full py-2 px-3 
                text-gray-700 leading-tight focus:outline-bluegray resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <button
                className="w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
                font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
              >
                Create
              </button>
              <div
                className="w-1/3 min-w-[84px] text-sm text-center bg-white hover:bg-gray-300 cursor-pointer border-2 
                text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
                onClick={() => handleModal(false)}
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListingModal;
