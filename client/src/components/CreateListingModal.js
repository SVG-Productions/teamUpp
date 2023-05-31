import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import FormField from "./FormField";
import ModalLayout from "../layouts/ModalLayout";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const CreateListingModal = ({ handleModal }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const { authedUser } = useAuth();
  const userId = authedUser.id;

  const { teamData } = useLoaderData();
  const { id: teamId } = teamData;

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
    navigate(`/teams/${teamId}/listings/${id}`);
  };
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-primary h-full w-full max-w-xl rounded-sm z-10 
          sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <div className="hidden sm:flex sm:absolute sm:right-1 sm:top-1">
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="cursor-pointer text-buttonPrimary hover:text-slate-500"
            onClick={() => handleModal(false)}
          />
        </div>
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
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="block font-bold text-headingColor mb-2 text-sm"
            >
              COMPANY DETAILS
            </label>
            <ReactQuill
              id="companyDetails"
              value={companyDetails}
              onChange={setCompanyDetails}
              modules={basicModules}
              theme="snow"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block font-bold text-headingColor mb-2 text-sm"
            >
              JOB DESCRIPTION
            </label>
            <ReactQuill
              id="description"
              value={jobDescription}
              onChange={setJobDescription}
              modules={basicModules}
              theme="snow"
            />
          </div>
          <div className="flex justify-center mt-6 gap-3">
            <CreateFormButtonGroup handleCancel={() => handleModal(false)} />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CreateListingModal;
