import { useRef, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import axios from "axios";
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
  const [editedExperience, setEditedExperience] = useState("");
  const editRef = useRef();

  const [_, setSearchParams] = useSearchParams();

  useOnClickOutside(editRef, () => setShowEditInput(false));

  const handleEditClick = () => {
    setShowEditInput(true);
    setEditedExperience(experience.content);
  };

  const handleDenyEdit = () => {
    setShowEditInput(false);
  };

  const handleAcceptEdit = async () => {
    await axios.patch(`/api/experiences/${experience.id}`, {
      content: editedExperience.replace(/&nbsp;/g, ""),
    });
    experience.content = editedExperience.replace(/&nbsp;/g, "");
    setShowEditInput(false);
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
              <DenyButton onClick={handleDenyEdit} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="font-bold text-slate-400 self-center">
            Interview Questions
          </h3>
          {authedUser.id === experience.userId && (
            <CreateButton
              fill="white"
              backgroundColor="slate-900"
              iconSize="12px"
              className="w-6 h-6"
            />
          )}
        </div>
        <ul
          className={`flex flex-col gap-2 pl-4 pr-8 py-2 ${
            experience.links.length && "bg-slate-100"
          } list-inside list-disc sm:ml-4`}
        >
          {experience.questions.length ? (
            experience.questions.map((q) => <li key={q.id}>{q.question}</li>)
          ) : (
            <NullInfo />
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="font-bold text-slate-400 self-center">
            Helpful Links
          </h3>
          {authedUser.id === experience.userId && (
            <CreateButton
              fill="white"
              backgroundColor="slate-900"
              iconSize="12px"
              className="w-6 h-6"
            />
          )}
        </div>
        <ul
          className={`flex flex-col gap-2 pl-4 pr-8 py-2 ${
            experience.links.length && "bg-slate-100"
          } list-inside list-disc sm:ml-4`}
        >
          {experience.links.length ? (
            experience.links.map((l) => (
              <li key={l.id}>
                <a
                  className="text-blue-600 underline"
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {l.description}
                </a>
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
