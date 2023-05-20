import axios from "axios";
import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";
import ModalLayout from "./ModalLayout";

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
          sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          CREATE LISTING
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow"
        >
          <div className="sm:w-2/3">
            <FormField
              label="Title"
              id="title"
              type="text"
              placeholder="Enter experience title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              Description
            </label>
            <textarea
              id="content"
              rows="20"
              cols="50"
              placeholder="Enter experience description..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink
              to={`/teams/${teamId}/listings/${listingId}`}
              className="w-1/4 min-w-[84px] text-sm sm:text-base text-center border-2 bg-white border-slate-600 hover:bg-red-200 text-slate-600 font-bold py-2 px-4 rounded focus:shadow-outline"
            >
              Cancel
            </NavLink>
            <button className="w-1/4 min-w-[84px] text-sm sm:text-base border-2 bg-white border-slate-600 hover:bg-blue-200 text-slate-600 font-bold py-2 px-4 rounded focus:shadow-outline">
              Create
            </button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CreateExperienceModal;
