import axios from "axios";
import React, { FormEventHandler, useRef, useState } from "react";
import {
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useOnClickOutside from "../hooks/useOnClickOutside";
import NullInfo from "./NullInfo";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
  faPlusCircle,
  faCircleXmark,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

interface QuestionType {
  id: string;
  experienceId: string;
  question: string;
}

interface LinkType {
  id: string;
  experienceId: string;
  description: string;
  url: string;
}

const ExperienceDetails = ({
  handleModal,
  tabs,
  setTabs,
}: {
  handleModal: (bool: boolean) => void;
  tabs: string;
  setTabs: (exp: string) => void;
}) => {
  const { authedUser } = useAuth();
  const { experienceData } = useLoaderData() as any;
  const [showEditInput, setShowEditInput] = useState(false);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [linkInput, setLinkInput] = useState({ description: "", url: "" });
  const [editedExperience, setEditedExperience] = useState("");
  const editRef = useRef<HTMLInputElement>(null);
  const revalidator = useRevalidator();

  const [_, setSearchParams] = useSearchParams();

  useOnClickOutside(editRef, () => setShowEditInput(false));

  const handleEditClick = () => {
    setShowEditInput(true);
    setEditedExperience(experienceData.content);
  };

  const handleAcceptEdit = async () => {
    try {
      const response = await axios.patch(
        `/api/experiences/${experienceData.id}`,
        {
          content: editedExperience.replace(/&nbsp;/g, ""),
        }
      );
      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
      setShowEditInput(false);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const postLink = async (e: any) => {
    try {
      e.preventDefault();
      await axios.post("/api/links", {
        experienceId: experienceData.id,
        description: linkInput.description,
        url: linkInput.url,
      });

      revalidator.revalidate();
      setShowLinkInput(false);
      setLinkInput({ description: "", url: "" });
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const postQuestion = async (e: any) => {
    try {
      e.preventDefault();
      await axios.post("/api/questions", {
        experienceId: experienceData.id,
        question: questionInput,
      });

      revalidator.revalidate();
      setShowQuestionInput(false);
      setQuestionInput("");
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const deleteLink = async (link: LinkType) => {
    try {
      await axios.delete(`/api/links/${link.id}`);
      revalidator.revalidate();
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const deleteQuestion = async (question: QuestionType) => {
    try {
      await axios.delete(`/api/questions/${question.id}`);
      revalidator.revalidate();
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const handleClose = () => {
    setSearchParams({});
    setTabs("experiences");
  };

  return (
    <div
      className={`flex flex-col gap-4 pt-4 ${
        tabs !== "experiences" && "hidden"
      } sm:flex sm:pt-0`}
    >
      <div className="flex justify-between items-center gap-4 pb-2 border-b border-borderprimary">
        <h2 className="font-semibold text-headingColor">
          {experienceData.title}
        </h2>
        <div className="flex items-center self-start gap-3">
          {authedUser?.id === experienceData.userId && (
            <FontAwesomeIcon
              icon={faTrashCan}
              className="cursor-pointer text-iconPrimary hover:text-red-500 mr-2"
              size="xl"
              onClick={() => handleModal(true)}
            />
          )}
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            onClick={handleClose}
          />
        </div>
      </div>
      <div ref={editRef}>
        <div className="px-2 py-1 mb-1">
          {showEditInput ? (
            <ReactQuill
              value={editedExperience}
              onChange={setEditedExperience}
              modules={basicModules}
              theme="snow"
            />
          ) : (
            parse(experienceData.content)
          )}
        </div>
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser?.id !== experienceData.userId && "hidden"
          }`}
        >
          <button
            onClick={handleEditClick}
            className={`text-xs font-bold hover:text-red-900 ${
              showEditInput ? "text-red-900" : "text-slate-600"
            }`}
          >
            edit
          </button>
          {showEditInput && (
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-green-500"
                onClick={handleAcceptEdit}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-iconPrimary cursor-pointer hover:text-red-500"
                onClick={() => setShowEditInput(false)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:w-full">
        <div className="flex justify-between pb-2 border-b border-borderprimary">
          <h2 className="font-semibold text-headingColor">
            Interview questions
          </h2>
          {authedUser?.id === experienceData.userId && (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="xl"
              onClick={() => setShowQuestionInput(true)}
              className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            />
          )}
        </div>
        <form
          onSubmit={postQuestion}
          className={`flex flex-col justify-between p-1 gap-1 border-2 border-slate-200 rounded-md mb-1 ${
            !showQuestionInput && "hidden"
          } sm:border-none sm:flex-row sm:gap-4 sm:p-0 sm:w-[97%]`}
        >
          <input
            className="border-2 border-slate-200 bg-slate-50 rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-bluegray sm:border-slate-100"
            type="text"
            value={questionInput}
            required
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Enter question... "
          />
          <div className="flex justify-end items-center gap-1 sm:justify-start">
            <button type="submit">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="xl"
                className="text-iconPrimary cursor-pointer hover:text-green-500"
              />
            </button>
            <FontAwesomeIcon
              icon={faXmarkSquare}
              size="xl"
              className="text-iconPrimary cursor-pointer hover:text-red-500"
              onClick={() => setShowQuestionInput(false)}
            />
          </div>
        </form>
        <ul
          className={`flex flex-col rounded-md mt-2 p-1 gap-1 bg-secondary shadow sm:mt-0 sm:w-[97%]`}
        >
          {experienceData.questions.length ? (
            experienceData.questions.map((q: QuestionType) => (
              <li
                className="flex justify-between items-center bg-primary p-2.5"
                key={q.id}
              >
                <p className="pr-2">{q.question}</p>
                {authedUser?.id === experienceData.userId && (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-iconPrimary hover:text-red-500 mr-2"
                    onClick={() => deleteQuestion(q)}
                  />
                )}
              </li>
            ))
          ) : (
            <li className="flex justify-between items-center bg-primary p-2.5">
              <NullInfo message="Add a question employers asked!" />
            </li>
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-4 sm:w-full">
        <div className="flex justify-between pb-2 border-b border-borderprimary">
          <h2 className="font-semibold text-headingColor">Helpful links</h2>
          {authedUser?.id === experienceData.userId && (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="xl"
              onClick={() => setShowLinkInput(true)}
              className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            />
          )}
        </div>
        <form
          onSubmit={postLink}
          className={`flex flex-col justify-between p-1 gap-1 border-2 border-slate-200 rounded-md mb-1 ${
            !showLinkInput && "hidden"
          } sm:border-none sm:flex-row sm:gap-4 sm:p-0 sm:w-[97%]`}
        >
          <div className="flex flex-col w-full gap-1 sm:flex-row sm:gap-2">
            <input
              className="border-2 border-slate-200 bg-slate-50 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray
              sm:w-2/5 sm:border-slate-100"
              type="text"
              value={linkInput.description}
              onChange={(e) =>
                setLinkInput({ ...linkInput, description: e.target.value })
              }
              placeholder="Link description... "
            />
            <input
              className="border-2 border-slate-200 bg-slate-50 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray 
              sm:w-3/5 sm:border-slate-100"
              type="url"
              value={linkInput.url}
              onChange={(e) =>
                setLinkInput({ ...linkInput, url: e.target.value })
              }
              placeholder="Enter url..."
            />
          </div>
          <div className="flex justify-end items-center gap-1 sm:justify-start">
            <button type="submit">
              <FontAwesomeIcon
                icon={faCheckSquare}
                size="xl"
                className="text-iconPrimary cursor-pointer hover:text-green-500"
              />
            </button>
            <FontAwesomeIcon
              icon={faXmarkSquare}
              size="xl"
              className="text-iconPrimary cursor-pointer hover:text-red-500"
              onClick={() => setShowLinkInput(false)}
            />
          </div>
        </form>
        <ul
          className={`flex flex-col rounded-md mt-2 p-1 gap-1 shadow bg-secondary sm:mt-0 sm:w-[97%]`}
        >
          {experienceData.links.length ? (
            experienceData.links.map((l: LinkType) => (
              <li
                className="flex justify-between items-center bg-primary p-2.5"
                key={l.id}
              >
                <a
                  className="text-blue-600 underline"
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.description}
                </a>
                {authedUser?.id === experienceData.userId && (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-iconPrimary hover:text-red-500 mr-2"
                    onClick={() => deleteLink(l)}
                  />
                )}
              </li>
            ))
          ) : (
            <li className="flex justify-between items-center bg-primary p-2.5">
              <NullInfo message="Add any helpful links here." />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceDetails;
