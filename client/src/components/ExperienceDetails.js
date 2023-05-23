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

const ExperienceDetails = ({ handleModal, mobileTabs, setMobileTabs }) => {
  const { authedUser } = useAuth();
  const { experience } = useLoaderData();
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [editedExperience, setEditedExperience] = useState();
  const experienceRef = useRef();

  const [_, setSearchParams] = useSearchParams();

  useOnClickOutside(experienceRef, () => setShowEditExperience(false));

  const handleEditClick = () => {
    setShowEditExperience(true);
    setEditedExperience(experience.content);
  };
  const handleUpdateExperience = async (experienceId) => {
    await axios.patch(`/api/experiences/${experienceId}`, {
      content: editedExperience.replace(/&nbsp;/g, ""),
    });
    experience.content = editedExperience.replace(/&nbsp;/g, "");
    setShowEditExperience(false);
  };

  const handleClose = () => {
    setSearchParams({});
    setMobileTabs("experiences");
  };

  return (
    <div
      ref={experienceRef}
      className={`flex flex-col gap-4 ${
        mobileTabs !== "exp" && "hidden"
      } sm:flex`}
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
      <p className="sm:pl-4 sm:pr-8">{experience.content}</p>
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
