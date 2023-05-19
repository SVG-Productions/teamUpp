import { useRef, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ContentEditable from "react-contenteditable";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";
import CloseButton from "./CloseButton";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Experience = ({ setIsModalShowing, tabs, setTabs }) => {
  const { authedUser } = useAuth();
  const { selectedExperience } = useLoaderData();
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [editedExperience, setEditedExperience] = useState();
  const experienceRef = useRef();

  const [_, setSearchParams] = useSearchParams();

  useOnClickOutside(experienceRef, () => setShowEditExperience(false));

  const handleEditClick = () => {
    setShowEditExperience(true);
    setEditedExperience(selectedExperience.content);
  };
  const handleUpdateExperience = async (experienceId) => {
    await axios.patch(`/api/experiences/${experienceId}`, {
      content: editedExperience.replace(/&nbsp;/g, ""),
    });
    selectedExperience.content = editedExperience.replace(/&nbsp;/g, "");
    setShowEditExperience(false);
  };

  const handleClose = () => {
    setSearchParams({});
    setTabs("listing");
  };

  return (
    <div
      ref={experienceRef}
      className={`flex flex-col sm:max-h-max sm:w-2/5 rounded-sm bg-slate-100 shadow ${
        tabs !== "exp" && "hidden"
      }`}
    >
      <div className="flex justify-between p-3 font-bold shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)]">
        <div>
          <p>{selectedExperience.title}</p>
          {authedUser.id === selectedExperience.userId && (
            <div className="flex gap-1 text-xs text-slate-600 h-[18px]">
              <button
                onClick={handleEditClick}
                className={`hover:text-red-900 ${
                  showEditExperience && "text-red-900"
                }`}
              >
                edit
              </button>
              <span> / </span>
              <button
                onClick={() => setIsModalShowing(true)}
                className={`hover:text-red-900`}
              >
                delete
              </button>
              {showEditExperience && (
                <div className="flex ml-2">
                  <AcceptButton
                    onClick={() =>
                      handleUpdateExperience(selectedExperience.id)
                    }
                  />
                  <DenyButton onClick={() => setShowEditExperience(false)} />
                </div>
              )}
            </div>
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
          {selectedExperience.content}
        </div>
      )}
    </div>
  );
};

export default Experience;
