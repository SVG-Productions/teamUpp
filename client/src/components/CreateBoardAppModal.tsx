import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import FormField from "./FormField";
import ModalLayout from "../layouts/ModalLayout";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBriefcase,
  faLink,
  faBuilding,
  faLocationDot,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { useBoard } from "../context/BoardContext";

const CreateBoardAppModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const { boardData, setBoardData } = useBoard();
  const [jobTitle, setJobTitle] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryFrequency, setSalaryFrequency] = useState("");

  const [appliedColumn]: any = Object.values(boardData.columns).filter(
    (c: any) => c.title === "applied"
  );
  const { authedUser } = useAuth();
  const userId = authedUser?.id;

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const listingData = {
        jobTitle,
        jobLink,
        companyName,
        companyDetails,
        location,
        jobDescription,
        salaryAmount: salaryAmount || null,
        salaryFrequency: salaryFrequency || null,
        userId,
      };
      const { data: createdApp } = await axios.post(
        "/api/listings",
        listingData
      );

      handleModal(false);
      setBoardData((prev: any) => ({
        ...prev,
        apps: {
          ...prev.apps,
          [createdApp.id]: { ...createdApp, statusId: appliedColumn.id },
        },
        columns: {
          ...prev.columns,
          [appliedColumn.id]: {
            ...prev.columns[appliedColumn.id],
            appIds: [...appliedColumn.appIds, createdApp.id],
          },
        },
      }));
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };
  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-primary h-full w-full max-w-5xl rounded-sm z-10 
          sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <div className="hidden sm:flex sm:absolute sm:right-4 sm:top-4">
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            onClick={() => handleModal(false)}
          />
        </div>
        <h2 className="text-2xl font-medium m-6 mb-0 sm:mx-12">
          Create application
        </h2>
        <span className="my-1 mx-6 text-xs text-slate-400 sm:mx-12">
          add information about a job application you made
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full p-6 sm:self-center sm:px-12 sm:gap-12 sm:flex-row"
        >
          <div className="sm:w-1/2">
            <div className="flex">
              <FormField
                label="Job title"
                id="jobTitle"
                type="text"
                placeholder="Enter job title..."
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                icon={faBriefcase}
                iconColor="text-green-500"
              />
            </div>
            <FormField
              label="Application link"
              id="link"
              type="url"
              placeholder="Enter link to application..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              icon={faLink}
              iconColor="text-blue-500"
            />
            <FormField
              label="Company name"
              id="companyName"
              type="text"
              placeholder="Enter company name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              icon={faBuilding}
              iconColor="text-violet-500"
            />
            <FormField
              label="Location"
              id="location"
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={faLocationDot}
              iconColor="text-red-500"
            />
            <div className="flex flex-col mb-4">
              <label
                className="block font-bold text-headingColor mb-2 text-sm"
                htmlFor="salaryAmount"
              >
                <FontAwesomeIcon
                  icon={faSackDollar}
                  className="mr-2 text-yellow-500"
                />
                <span>Salary</span>
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
          </div>
          <div className="sm:w-1/2">
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
            <div className="flex justify-center mt-6 gap-3 sm:justify-end">
              <CreateFormButtonGroup handleCancel={() => handleModal(false)} />
            </div>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CreateBoardAppModal;
