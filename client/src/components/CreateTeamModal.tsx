import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactElement,
  useState,
} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jobFieldsData } from "../utils/jobFieldsData";
import FormField from "./FormField";
import NullInfo from "./NullInfo";
import ModalLayout from "../layouts/ModalLayout";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBullhorn,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

interface CreateTeamModalProps {
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTeamModal = ({
  handleModal,
}: CreateTeamModalProps): ReactElement => {
  const [name, setName] = useState<string>("");
  const [jobField, setJobField] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const teamData = {
        name,
        jobField,
        description,
        userId: authedUser?.id,
        avatar: `/team/avatars/teamavatar${
          Math.floor(Math.random() * 12) + 1
        }.png`,
      };
      const { data: createdTeam } = await axios.post("/api/teams", teamData);
      navigate(`/teams/${createdTeam.id}`);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const newResults = jobFieldsData.filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setResults(newResults);
  };

  const handleSelect = (e: MouseEvent, selectedItem: string) => {
    e.preventDefault();

    setJobField(selectedItem);
    setQuery("");
    setResults([]);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-primary h-full w-full max-w-xl rounded-sm z-10 
          sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
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
          className="w-full p-6 sm:px-16 sm:self-center"
        >
          <h2 className="text-2xl font-medium mb-6">Create Team</h2>
          <FormField
            label="Team name"
            id="name"
            type="text"
            placeholder="Enter team name..."
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            icon={faUsers}
            iconColor="text-blue-500"
          />
          <div className="w-full">
            <label
              htmlFor="jobField"
              className="block font-bold text-headingColor mb-2 text-sm"
            >
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-green-500 mr-2"
              />
              <span>Job field</span>
            </label>
            <div className="flex flex-col w-full">
              {!jobField ? (
                <input
                  type="text"
                  className="border border-borderprimary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-bluegray"
                  id="jobField"
                  autoComplete="off"
                  placeholder="Search job fields"
                  value={query}
                  onChange={handleQueryChange}
                />
              ) : (
                <div className="flex">
                  <input
                    value={jobField}
                    readOnly
                    className="capitalize border border-borderprimary rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
                  />
                  <button
                    className="m-auto w-1/6 ml-4 h-[80%] text-sm border-2
                   border-borderprimary hover:bg-highlight text-primary
                  font-bold p-2 rounded focus:shadow-outline sm:text-sm"
                    onClick={() => setJobField("")}
                  >
                    Clear
                  </button>
                </div>
              )}
              <div className="relative w-full">
                {results && query && (
                  <ul
                    className="absolute z-10 w-4/5 min-h-fit max-h-40 bg-secondary 
                border-2 border-borderprimary border-t-0 rounded overflow-auto"
                  >
                    {results.length ? (
                      results.map((item) => (
                        <a
                          key={item}
                          href="/"
                          className="no-underline text-primary"
                          onClick={(e) => handleSelect(e, item)}
                        >
                          <li className="hover:bg-highlight capitalize pl-2">
                            {item}
                          </li>
                        </a>
                      ))
                    ) : (
                      <div className="pl-2">
                        <NullInfo message="Sorry, no job fields by this name found." />
                      </div>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <label
              htmlFor="description"
              className="block font-bold text-headingColor mb-2 text-sm"
            >
              <FontAwesomeIcon
                icon={faBullhorn}
                className="text-red-500 mr-2"
              />
              <span>Team credo</span>
            </label>
            <ReactQuill
              id="description"
              value={description}
              onChange={setDescription}
              modules={basicModules}
              theme="snow"
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

export default CreateTeamModal;
