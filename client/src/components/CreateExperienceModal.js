import axios from "axios";
import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";
import ModalLayout from "./ModalLayout";
import CreateFormButtonGroup from "./CreateFormButtonGroup";

const CreateExperienceModal = ({ handleModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState([]);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const { authedUser } = useAuth();
  const userId = authedUser.id;

  const { team, listing } = useLoaderData();
  const { id: teamId, name } = team;
  const { id: listingId, companyName, jobTitle } = listing;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceData = {
      title,
      content,
      userId,
      listingId,
    };
    await axios.post("/api/experiences", experienceData);
    navigate(`/teams/${teamId}/listings/${listingId}/experiences`);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="flex flex-col bg-white h-full w-full max-w-xl rounded-sm z-10 
        sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          CREATE EXPERIENCE
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 sm:max-w-md sm:self-center"
        >
          <FormField
            label="EXP TITLE"
            id="title"
            type="text"
            placeholder="Enter experience title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="block font-bold text-slate-400 mb-2 text-sm"
            >
              EXP DESCRIPTION
            </label>
            <textarea
              id="content"
              rows="8"
              cols="50"
              placeholder="Enter experience description..."
              className="border border-slate-900 rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-bluegray resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

export default CreateExperienceModal;
