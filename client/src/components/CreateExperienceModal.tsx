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
  faBriefcase,
  faCircleInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
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
  const { id: listingId, jobTitle, companyName } = listingData;

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
        className="relative flex flex-col bg-primary h-full w-full max-w-5xl rounded-sm z-10
        sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto"
      >
        <div className="hidden sm:flex sm:absolute sm:right-4 sm:top-4">
          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            className="cursor-pointer text-iconPrimary hover:text-iconSecondary"
            onClick={() => handleModal(false)}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col w-full p-6 sm:self-center sm:px-12"
        >
          <div className="flex flex-col sm:gap-8 sm:flex-row">
            <div className="sm:w-2/5">
              <h2 className="text-2xl font-medium mb-2">Add new experience</h2>
              <div className="flex gap-2 mb-6">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-green-500"
                />
                <h3 className="text-xs text-slate-400">
                  {jobTitle} - {companyName}
                </h3>
              </div>
              <div className="sm:w-11/12">
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
            </div>
            <div className="sm:w-3/5 sm:border sm:border-borderprimary sm:rounded-sm sm:my-4">
              <div className="flex py-2 mb-4 items-center gap-2 sm:px-4 sm:mb-0 border-b">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="text-blue-500"
                />
                <h3 className="font-medium">
                  More details{" "}
                  <span className="text-slate-400 text-xs">(optional)</span>
                </h3>
              </div>
              <div className="sm:p-4">
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
                          onChange={(event) =>
                            handleQuestionChange(index, event)
                          }
                          placeholder="Enter question... "
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="cursor-pointer text-slate-400 hover:text-red-500 ml-2"
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
                        className="flex items-center border rounded-md px-2 sm:border-none sm:w-[95%] sm:gap-2 sm:px-0"
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
                          className="cursor-pointer text-slate-400 hover:text-red-500 ml-2"
                          onClick={() => deleteLink(index)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center sm:self-end sm:justify-end sm:w-3/4 mt-8 gap-3">
            <CreateFormButtonGroup handleCancel={() => handleModal(false)} />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CreateExperienceModal;
