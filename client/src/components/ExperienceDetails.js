import axios from "axios";
import { useRef, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
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

const ExperienceDetails = ({ handleModal, tabs, setTabs }) => {
  const { authedUser } = useAuth();
  const { experienceData } = useLoaderData();
  const [showEditInput, setShowEditInput] = useState(false);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [linkInput, setLinkInput] = useState({ description: "", url: "" });
  const [editedExperience, setEditedExperience] = useState("");
  const [links, setLinks] = useState(experienceData.links);
  const [questions, setQuestions] = useState(experienceData.questions);
  const editRef = useRef();

  const [_, setSearchParams] = useSearchParams();

  useOnClickOutside(editRef, () => setShowEditInput(false));

  const handleEditClick = () => {
    setShowEditInput(true);
    setEditedExperience(experienceData.content);
  };

  const handleAcceptEdit = async () => {
    await axios.patch(`/api/experiences/${experienceData.id}`, {
      content: editedExperience.replace(/&nbsp;/g, ""),
    });
    experienceData.content = editedExperience.replace(/&nbsp;/g, "");
    setShowEditInput(false);
  };

  const postLink = async (e) => {
    e.preventDefault();
    const {
      data: [addedLink],
    } = await axios.post("/api/links", {
      experienceId: experienceData.id,
      description: linkInput.description,
      url: linkInput.url,
    });

    setLinks([...links, addedLink]);

    setShowLinkInput(false);
    setLinkInput({ description: "", url: "" });
  };

  const postQuestion = async (e) => {
    e.preventDefault();
    const {
      data: [addedQuestion],
    } = await axios.post("/api/questions", {
      experienceId: experienceData.id,
      question: questionInput,
    });

    setQuestions([...questions, addedQuestion]);

    setShowQuestionInput(false);
    setQuestionInput("");
  };

  const deleteLink = async (link) => {
    await axios.delete(`/api/links/${link.id}`);

    setLinks(links.filter((l) => link.id !== l.id));
  };

  const deleteQuestion = async (question) => {
    await axios.delete(`/api/questions/${question.id}`);

    setQuestions(questions.filter((q) => question.id !== q.id));
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
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-headingColor text-lg font-bold uppercase self-center sm:text-xl">
          {experienceData.title}
        </h2>
        <div className="flex items-center self-start gap-3">
          {authedUser.id === experienceData.userId && (
            <FontAwesomeIcon
              icon={faTrashCan}
              className="cursor-pointer text-buttonPrimary hover:text-red-500 mr-2"
              size="xl"
              onClick={() => handleModal(true)}
            />
          )}
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="cursor-pointer text-buttonPrimary hover:text-slate-500"
            onClick={handleClose}
          />
        </div>
      </div>
      <div ref={editRef}>
        {showEditInput ? (
          <ReactQuill
            value={editedExperience}
            onChange={setEditedExperience}
            modules={basicModules}
            theme="snow"
          />
        ) : (
          <div className="px-2 py-1 border-l-2 mb-1">
            {parse(experienceData.content)}
          </div>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== experienceData.userId && "hidden"
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
                className="text-buttonPrimary cursor-pointer hover:text-green-500"
                onClick={handleAcceptEdit}
              />
              <FontAwesomeIcon
                icon={faXmarkSquare}
                size="lg"
                className="text-buttonPrimary cursor-pointer hover:text-red-500"
                onClick={() => setShowEditInput(false)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:w-[95%]">
        <div className="flex justify-between">
          <h3 className="font-bold text-headingColor self-center mb-2">
            Interview Questions
          </h3>
          {authedUser.id === experienceData.userId && (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="xl"
              onClick={() => setShowQuestionInput(true)}
              className="cursor-pointer text-buttonPrimary hover:text-slate-500"
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
                className="text-buttonPrimary cursor-pointer hover:text-green-500"
              />
            </button>
            <FontAwesomeIcon
              icon={faXmarkSquare}
              size="xl"
              className="text-buttonPrimary cursor-pointer hover:text-red-500"
              onClick={() => setShowQuestionInput(false)}
            />
          </div>
        </form>
        {questions.length ? (
          <ul
            className={`flex flex-col rounded-md mt-2 p-1 gap-1 bg-secondary shadow sm:mt-0 sm:w-[97%]`}
          >
            {questions.map((q) => (
              <li
                className={`flex justify-between items-center bg-primary p-2.5`}
                key={q.id}
              >
                <p className="pr-2">{q.question}</p>
                {authedUser.id === experienceData.userId && (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-buttonPrimary hover:text-red-500 mr-2"
                    onClick={() => deleteQuestion(q)}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <NullInfo />
        )}
      </div>
      <div className="flex flex-col sm:w-[95%]">
        <div className="flex justify-between">
          <h3 className="font-bold text-headingColor self-center mb-2">
            Helpful Links
          </h3>
          {authedUser.id === experienceData.userId && (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="xl"
              onClick={() => setShowLinkInput(true)}
              className="cursor-pointer text-buttonPrimary hover:text-slate-500"
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
                className="text-buttonPrimary cursor-pointer hover:text-green-500"
              />
            </button>
            <FontAwesomeIcon
              icon={faXmarkSquare}
              size="xl"
              className="text-buttonPrimary cursor-pointer hover:text-red-500"
              onClick={() => setShowLinkInput(false)}
            />
          </div>
        </form>
        {links.length ? (
          <ul
            className={`flex flex-col rounded-md mt-2 p-1 gap-1 shadow bg-secondary sm:mt-0 sm:w-[97%]`}
          >
            {links.map((l, index) => (
              <li
                className={`flex justify-between items-center bg-primary p-2.5`}
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
                {authedUser.id === experienceData.userId && (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-buttonPrimary hover:text-red-500 mr-2"
                    onClick={() => deleteLink(l)}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <NullInfo />
        )}
      </div>
    </div>
  );
};

export default ExperienceDetails;
