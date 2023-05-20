import axios from "axios";
import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";
import ModalLayout from "./ModalLayout";
import CreateButton from "./CreateButton";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import DeleteButton from "./DeleteButton";

const CreateExperienceModal = ({ handleModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState([]);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const { authedUser } = useAuth();
  const userId = authedUser.id;

  const { team, listing } = useLoaderData();
  const { id: teamId } = team;
  const { id: listingId } = listing;

  const handleLinkChange = (index, field, event) => {
    const newLinks = [...links];
    newLinks[index][field] = event.target.value;
    setLinks(newLinks);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const addLinkInput = () => {
    setLinks([...links, { url: "", description: "" }]);
  };

  const addQuestionInput = () => {
    setQuestions([...questions, ""]);
  };

  const deleteLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceData = {
      title,
      content,
      userId,
      listingId,
      links,
      questions,
    };
    const newExp = await axios.post("/api/experiences", experienceData);
    navigate(`/teams/${teamId}/listings/${listingId}?experience=${newExp.id}`);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="flex flex-col bg-white h-full w-full max-w-2xl rounded-sm z-10 
        sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          ADD NEW EXPERIENCE
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 sm:max-w-xl sm:self-center"
        >
          <div className="w-2/3">
            <FormField
              label="EXP TITLE"
              id="title"
              type="text"
              placeholder="Enter experience title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
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
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="content"
                className="block font-bold text-slate-400 text-sm"
              >
                INTERVIEW QUESTIONS
              </label>
              <CreateButton
                onClick={addQuestionInput}
                fill="white"
                backgroundColor="slate-900"
                iconSize="12px"
                className="w-6 h-6"
              />
            </div>
            <ul className="flex flex-col gap-2">
              {questions.map((question, index) => (
                <li className="flex gap-2" key={"question" + index}>
                  <input
                    className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
                    type="text"
                    value={question}
                    required
                    onChange={(event) => handleQuestionChange(index, event)}
                    placeholder="Enter question... "
                  />
                  <DeleteButton onClick={deleteQuestion} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="content"
                className="block font-bold text-slate-400 text-sm"
              >
                HELPFUL LINKS
              </label>
              <CreateButton
                onClick={addLinkInput}
                fill="white"
                backgroundColor="slate-900"
                iconSize="12px"
                className="w-6 h-6"
              />
            </div>
            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <li className="flex gap-2" key={"link" + index}>
                  <input
                    className="border border-slate-900 rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
                    type="text"
                    value={link.description}
                    onChange={(event) =>
                      handleLinkChange(index, "description", event)
                    }
                    placeholder="Link description... "
                  />
                  <input
                    className="border border-slate-900 rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
                    type="text"
                    value={link.url}
                    onChange={(event) => handleLinkChange(index, "url", event)}
                    placeholder="Enter url..."
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mt-8 gap-3">
            <CreateFormButtonGroup handleCancel={() => handleModal(false)} />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CreateExperienceModal;
