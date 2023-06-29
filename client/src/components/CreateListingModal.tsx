import axios from "axios";
import React, { FormEvent, useState } from "react";
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
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { TeamType } from "../../type-definitions";

const CreateListingModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryFrequency, setSalaryFrequency] = useState("");

  const { authedUser } = useAuth();
  const userId = authedUser?.id;

  const { teamData } = useLoaderData() as { teamData: TeamType };
  const { id: teamId } = teamData;

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const listingData = {
        jobTitle,
        jobLink,
        companyName,
        companyDetails,
        jobDescription,
        salaryAmount: salaryAmount || null,
        salaryFrequency: salaryFrequency || null,
        teamId,
        userId,
      };
      const {
        data: { id },
      } = await axios.post("/api/listings", listingData);
      navigate(`/teams/${teamId}/listings/${id}`);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-primary h-full w-full max-w-xl rounded-sm z-10 
          sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:bg-secondary sm:max-h-[90%]"
      >
        <div className="hidden sm:flex sm:absolute sm:right-1 sm:top-1">
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            onClick={() => handleModal(false)}
          />
        </div>
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          Create Listing
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 sm:max-w-md sm:self-center"
        >
          <FormField
            label="Job title"
            id="jobTitle"
            type="text"
            placeholder="Enter job title..."
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <FormField
            label="Application link"
            id="link"
            type="url"
            placeholder="Enter link to application..."
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
          />
          <FormField
            label="Company name"
            id="companyName"
            type="text"
            placeholder="Enter company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="flex flex-col mb-4">
            <label
              className="block font-bold text-headingColor mb-2 text-sm"
              htmlFor="salaryAmount"
            >
              Salary
            </label>
            <div className="flex">
              <span className="font-bold text-xl self-center mr-1">$</span>
              <input
                className="border border-borderprimary rounded w-full py-2 px-3 mr-2 text-primary leading-tight focus:outline-bluegray"
                id="salaryAmount"
                placeholder="0"
                type="number"
                min="0"
                max="1000000"
                value={salaryAmount}
                onChange={(e) => setSalaryAmount(e.target.value)}
                autoComplete="off"
              />
              <select
                className="border border-borderprimary text-xs bg-primary rounded w-fit py-1 px-1.5 text-primary leading-tight focus:outline-bluegray"
                id="salaryFrequency"
                value={salaryFrequency}
                onChange={(e) => setSalaryFrequency(e.target.value)}
              >
                <option value="">Select frequency</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="description"
              className="block font-bold text-headingColor mb-2 text-sm"
            >
              Company details
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
              Job description
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
