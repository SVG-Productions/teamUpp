import axios from "axios";
import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormField from "./FormField";
import ModalLayout from "./ModalLayout";
import CreateButton from "./CreateButton";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import DeleteButton from "./DeleteButton";
import CloseButton from "./CloseButton";

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
    const { data: newExp } = await axios.post(
      "/api/experiences",
      experienceData
    );
    handleModal(false);
    navigate(`/teams/${teamId}/listings/${listingId}?experience=${newExp.id}`);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-white h-full w-full max-w-3xl rounded-sm z-10 
        sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <div className="hidden sm:flex sm:absolute sm:right-1 sm:top-1">
          <CloseButton onClick={() => handleModal(false)} />
        </div>
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          ADD NEW EXPERIENCE
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 sm:max-w-2xl sm:self-center"
        >
          <div className="sm:w-2/3">
            <FormField
              label="EXP TITLE"
              id="title"
              type="text"
              placeholder="Enter experience title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4 sm:w-[95%]">
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
                <li className="flex gap-2 sm:w-[95%]" key={"question" + index}>
                  <input
                    className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
                    type="text"
                    value={question}
                    required
                    onChange={(event) => handleQuestionChange(index, event)}
                    placeholder="Enter question... "
                  />
                  <DeleteButton
                    onClick={() => deleteQuestion(index)}
                    fill="fill-slate-400"
                  />
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
            <ul className="flex flex-col gap-4 sm:gap-2">
              {links.map((link, index) => (
                <li
                  className="flex  border-2 rounded-md sm:border-none sm:w-[95%] sm:gap-2"
                  key={"link" + index}
                >
                  <div className="flex flex-col w-full gap-2 p-2 pl-0 sm:flex-row sm:p-0">
                    <input
                      className="border border-slate-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray sm:w-2/5"
                      type="text"
                      value={link.description}
                      onChange={(event) =>
                        handleLinkChange(index, "description", event)
                      }
                      placeholder="Link description... "
                    />
                    <input
                      className="border border-slate-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray sm:w-3/5"
                      type="text"
                      value={link.url}
                      onChange={(event) =>
                        handleLinkChange(index, "url", event)
                      }
                      placeholder="Enter url..."
                    />
                  </div>
                  <DeleteButton
                    onClick={() => deleteLink(index)}
                    fill="fill-slate-400"
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
