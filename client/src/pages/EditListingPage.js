import axios from "axios";
import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";

export const EditListingPage = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState(data.jobTitle);
  const [jobLink, setJobLink] = useState(data.jobLink);
  const [companyName, setCompanyName] = useState(data.companyName);
  const [companyDetails, setCompanyDetails] = useState(data.companyDetails);
  const [jobDescription, setJobDescription] = useState(data.jobDescription);

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingData = {
      jobTitle,
      jobLink,
      companyName,
      companyDetails,
      jobDescription,
    };
    axios.patch(`/api/listings/${data.id}`, listingData);
    navigate(`/teams/${data.teamId}/listings/${data.id}/details`);
  };

  return (
    <>
      <div className="flex justify-between">
        <AuthedPageTitle>
          <NavLink to="/teams" className="hover:underline">
            Teams
          </NavLink>{" "}
          /{" "}
          <NavLink to={`/teams/${data.teamId}`} className="hover:underline">
            {data.teamName}
          </NavLink>{" "}
          /{" "}
          <NavLink
            to={`/teams/${data.teamId}/listings/${data.id}/details`}
            className="hover:underline"
          >
            {data.companyName} - {data.jobTitle}
          </NavLink>{" "}
          / <NavLink className="hover:underline">Edit</NavLink>
        </AuthedPageTitle>
        <NavLink
          to={`/teams/${data.teamId}/listings/${data.id}/delete`}
          className="self-start border-2 border-red-500 hover:bg-red-200 text-xs font-bold text-red-500 py-2 px-2 mt-2 rounded focus:shadow-outline whitespace-nowrap"
        >
          Delete Listing
        </NavLink>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow"
        >
          <div className="sm:w-2/3">
            <FormField
              label="Job Title"
              id="jobTitle"
              type="text"
              placeholder="Enter job title..."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <FormField
              label="Link to Application"
              id="link"
              type="url"
              placeholder="Enter link to application..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
            <FormField
              label="Company Name"
              id="companyName"
              type="text"
              placeholder="Enter company name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <FormField
              label="Company Details"
              id="companyDetails"
              type="text"
              placeholder="Enter company details..."
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              Job Description
            </label>
            <textarea
              id="description"
              rows="11"
              cols="50"
              placeholder="Enter job description..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink
              to={`/teams/${data.teamId}/listings/${data.id}/details`}
              className="w-1/4 min-w-[84px] text-sm sm:text-base text-center border-2 bg-white border-slate-600 hover:bg-red-200 text-slate-600 font-bold py-2 px-4 rounded focus:shadow-outline"
            >
              Cancel
            </NavLink>
            <button className="w-1/4 min-w-[84px] text-sm sm:text-base border-2 bg-white border-slate-600 hover:bg-blue-200 text-slate-600 font-bold py-2 px-4 rounded focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const editListingLoader = ({ request, params }) => {
  const { listingId } = params;
  const listingData = axios.get(`/api/listings/${listingId}`);
  return listingData;
};
