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

const ExperienceDetails = ({ handleModal, tabs, setTabs }) => {
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
    setTabs("experiences");
  };

  return (
    <div
      ref={experienceRef}
      className={`flex flex-col gap-4 ${
        tabs !== "listing" && "hidden"
      } sm:flex`}
    >
      <div className="hidden justify-between sm:flex">
        <div className="flex gap-2">
          <h2 className="text-slate-400 text-lg font-bold sm:text-xl">
            EXPERIENCE DETAILS
          </h2>
          {authedUser.id === experience.userId && (
            <DeleteButton
              onClick={() => handleModal(true)}
              fill="sm:hover:fill-slate-400"
            />
          )}
        </div>
        <CloseButton onClick={handleClose} />
      </div>
      {showEditExperience ? (
        <ContentEditable
          html={editedExperience}
          onChange={(e) => setEditedExperience(e.target.value)}
          className="h-full p-3 m-1 bg-white rounded-sm overflow-auto border-2 border-blue-600 "
        />
      ) : (
        <div className="h-full p-3 m-1 border-2 border-white bg-white rounded-sm overflow-auto">
          {experience.content}
        </div>
      )}
    </div>
  );
};

export default ExperienceDetails;
