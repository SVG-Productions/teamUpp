import axios from "axios";
import { useRef, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ContentEditable from "react-contenteditable";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";
import CloseButton from "./CloseButton";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DeleteButton from "./DeleteButton";
import NullInfo from "./NullInfo";
import CreateButton from "./CreateButton";

const ExperienceDetails = ({ handleModal, tabs, setTabs }) => {
  const { authedUser } = useAuth();
  const { experience } = useLoaderData();
  const [showEditInput, setShowEditInput] = useState(false);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [linkInput, setLinkInput] = useState({ description: "", url: "" });
  const [editedExperience, setEditedExperience] = useState("");
  const [links, setLinks] = useState(experience.links);
  const [questions, setQuestions] = useState(experience.questions);
  const editRef = useRef();

  const [_, setSearchParams] = useSearchParams();

  useOnClickOutside(editRef, () => setShowEditInput(false));

  const handleEditClick = () => {
    setShowEditInput(true);
    setEditedExperience(experience.content);
  };

  const handleAcceptEdit = async () => {
    await axios.patch(`/api/experiences/${experience.id}`, {
      content: editedExperience.replace(/&nbsp;/g, ""),
    });
    experience.content = editedExperience.replace(/&nbsp;/g, "");
    setShowEditInput(false);
  };

  const postLink = async (e) => {
    e.preventDefault();
    const {
      data: [addedLink],
    } = await axios.post("/api/links", {
      experienceId: experience.id,
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
      experienceId: experience.id,
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
        <h2 className="text-slate-400 text-lg font-bold uppercase self-center sm:text-xl">
          {experience.title}
        </h2>
        <div className="flex items-center self-start gap-3">
          {authedUser.id === experience.userId && (
            <DeleteButton
              onClick={() => handleModal(true)}
              fill="fill-black sm:hover:fill-slate-400"
            />
          )}
          <CloseButton onClick={handleClose} />
        </div>
      </div>
      <div ref={editRef}>
        {showEditInput ? (
          <ContentEditable
            onChange={(e) => setEditedExperience(e.target.value)}
            className="px-1 bg-slate-100 border-2 rounded border-blue-600 break-words"
            html={editedExperience}
          />
        ) : (
          <p className="px-1 border-2 border-white">{experience.content}</p>
        )}
        <div
          className={`flex justify-between h-5 items-center ${
            authedUser.id !== experience.userId && "hidden"
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
            <div className="flex items-center">
              <AcceptButton onClick={handleAcceptEdit} />
              <DenyButton onClick={() => setShowEditInput(false)} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="font-bold text-slate-400 self-center">
            Interview Questions
          </h3>
          {authedUser.id === experience.userId && (
            <CreateButton
              onClick={() => setShowQuestionInput(true)}
              fill="white"
              backgroundColor="slate-900"
              iconSize="12px"
              className="w-6 h-6"
            />
          )}
        </div>
        <form
          onSubmit={postQuestion}
          className={`flex justify-between gap-4 ${
            !showQuestionInput && "hidden"
          }`}
        >
          <input
            className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
            type="text"
            value={questionInput}
            required
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Enter question... "
          />
          <div className="flex items-center">
            <AcceptButton iconSize="28px" />
            <DenyButton
              iconSize="28px"
              onClick={() => setShowQuestionInput(false)}
            />
          </div>
        </form>
        <ul className={`flex flex-col p-2 sm:pr-[4.5rem]`}>
          {questions.length ? (
            questions.map((q, index) => (
              <li
                className={`flex justify-between p-2.5 ${
                  index < questions.length - 1 && "border-b"
                }`}
                key={q.id}
              >
                <p className="pr-2">{q.question}</p>
                {authedUser.id === experience.userId && (
                  <DeleteButton
                    onClick={() => deleteQuestion(q)}
                    fill="fill-slate-400 hover:fill-slate-900"
                    className="w-6 h-6"
                  />
                )}
              </li>
            ))
          ) : (
            <NullInfo />
          )}
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="font-bold text-slate-400 self-center">
            Helpful Links
          </h3>
          {authedUser.id === experience.userId && (
            <CreateButton
              onClick={() => setShowLinkInput(true)}
              fill="white"
              backgroundColor="slate-900"
              iconSize="12px"
              className="w-6 h-6"
            />
          )}
        </div>
        <form
          onSubmit={postLink}
          className={`flex justify-between gap-4 ${!showLinkInput && "hidden"}`}
        >
          <div className="flex flex-col w-full gap-2 sm:flex-row">
            <input
              className="border border-slate-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray sm:w-2/5"
              type="text"
              value={linkInput.description}
              onChange={(e) =>
                setLinkInput({ ...linkInput, description: e.target.value })
              }
              placeholder="Link description... "
            />
            <input
              className="border border-slate-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray sm:w-3/5"
              type="url"
              value={linkInput.url}
              onChange={(e) =>
                setLinkInput({ ...linkInput, url: e.target.value })
              }
              placeholder="Enter url..."
            />
          </div>
          <div className="flex items-start sm:items-center">
            <AcceptButton iconSize="28px" />
            <DenyButton
              iconSize="28px"
              onClick={() => setShowLinkInput(false)}
            />
          </div>
        </form>
        <ul
          className={`flex flex-col rounded-md bg-slate-100 m-2 sm:mr-[4.5rem]`}
        >
          {links.length ? (
            links.map((l, index) => (
              <li
                className={`flex justify-between p-2.5 ${
                  index < links.length - 1 && "border-b border-white"
                }`}
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
                {authedUser.id === experience.userId && (
                  <DeleteButton
                    onClick={() => deleteLink(l)}
                    fill="fill-slate-400 hover:fill-slate-900"
                    className="w-6 h-6"
                    backgroundColor="bg-slate-100"
                  />
                )}
              </li>
            ))
          ) : (
            <NullInfo />
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceDetails;
