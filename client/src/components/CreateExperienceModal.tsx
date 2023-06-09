import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import FormField from "./FormField";
import ModalLayout from "../layouts/ModalLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCircleXmark,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { LinkType, ListingType, TeamType } from "../../type-definitions";

const CreateExperienceModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState<LinkType[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);

  const navigate = useNavigate();

  const { authedUser } = useAuth();
  const userId = authedUser?.id;

  const { teamData, listingData } = useLoaderData() as {
    teamData: TeamType;
    listingData: ListingType;
  };
  const { id: teamId } = teamData;
  const { id: listingId } = listingData;

  const handleLinkChange = (
    index: number,
    field: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newLinks = [...links];
    newLinks[index][field as keyof LinkType] = e.target.value;
    setLinks(newLinks);
  };

  const handleQuestionChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  const addLinkInput = () => {
    setLinks([...links, { url: "", description: "" }]);
  };

  const addQuestionInput = () => {
    setQuestions([...questions, ""]);
  };

  const deleteLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    try {
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
      navigate(
        `/teams/${teamId}/listings/${listingId}?experience=${newExp.id}`
      );
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-primary h-full w-full max-w-3xl rounded-sm z-10 
        sm:h-fit sm:shadow-lg sm:rounded-md sm:bg-secondary sm:overflow-auto sm:max-h-[90%]"
      >
        <div className="hidden sm:flex sm:absolute sm:right-1 sm:top-1">
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            onClick={() => handleModal(false)}
          />
        </div>
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          Add new experience
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 sm:max-w-2xl sm:self-center"
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
          <div className="flex flex-col mb-4 sm:w-[95%]">
            <label
              htmlFor="content"
              className="block font-bold text-headingColor mb-2 text-sm"
            >
              Description
            </label>
            <ReactQuill
              id="content"
              value={content}
              onChange={setContent}
              modules={basicModules}
              theme="snow"
            />
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="content"
                className="block font-bold text-headingColor text-sm"
              >
                Interview questions
              </label>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="xl"
                onClick={addQuestionInput}
                className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
              />
            </div>
            <ul className="flex flex-col gap-2">
              {questions.map((question, index) => (
                <li
                  className="flex gap-2 items-center sm:w-[95%]"
                  key={"question" + index}
                >
                  <input
                    className="border border-borderprimary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
                    type="text"
                    value={question}
                    required
                    onChange={(event) => handleQuestionChange(index, event)}
                    placeholder="Enter question... "
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-iconPrimary hover:text-red-500 ml-2"
                    size="xl"
                    onClick={() => deleteQuestion(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="content"
                className="block font-bold text-headingColor text-sm"
              >
                Helpful links
              </label>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="xl"
                onClick={addLinkInput}
                className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
              />
            </div>
            <ul className="flex flex-col gap-4 sm:gap-2">
              {links.map((link, index) => (
                <li
                  className="flex items-center border-2 rounded-md sm:border-none sm:w-[95%] sm:gap-2"
                  key={"link" + index}
                >
                  <div className="flex flex-col w-full gap-2 p-2 pl-0 sm:flex-row sm:p-0">
                    <input
                      className="border border-borderprimary rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray sm:w-2/5"
                      type="text"
                      value={link.description}
                      onChange={(event) =>
                        handleLinkChange(index, "description", event)
                      }
                      placeholder="Link description... "
                    />
                    <input
                      className="border border-borderprimary rounded py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray sm:w-3/5"
                      type="url"
                      value={link.url}
                      onChange={(event) =>
                        handleLinkChange(index, "url", event)
                      }
                      placeholder="Enter url..."
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="cursor-pointer text-iconPrimary hover:text-red-500 ml-2"
                    size="xl"
                    onClick={() => deleteLink(index)}
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
