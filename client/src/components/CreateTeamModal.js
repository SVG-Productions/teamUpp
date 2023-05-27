import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jobFieldsData } from "../utils/jobFieldsData";
import FormField from "./FormField";
import NullInfo from "./NullInfo";
import ModalLayout from "../layouts/ModalLayout";
import CreateFormButtonGroup from "./CreateFormButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";

const CreateTeamModal = ({ handleModal }) => {
  const [name, setName] = useState("");
  const [jobField, setJobField] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = {
      name,
      jobField,
      description,
      userId: authedUser.id,
    };
    const { data: createdTeam } = await axios.post("/api/teams", teamData);
    navigate(`/teams/${createdTeam.id}`);
  };

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const newResults = jobFieldsData.filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setResults(newResults);
  };

  const handleSelect = (event, selectedItem) => {
    event.preventDefault();

    setJobField(selectedItem);
    setQuery("");
    setResults([]);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="relative flex flex-col bg-white h-full w-full max-w-xl rounded-sm z-10 
          sm:h-fit sm:shadow-lg sm:rounded-md sm:overflow-auto sm:max-h-[90%]"
      >
        <div className="hidden sm:flex sm:absolute sm:right-1 sm:top-1">
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="cursor-pointer text-slate-900 hover:text-slate-500"
            onClick={() => handleModal(false)}
          />
        </div>
        <h2 className="text-lg font-bold mb-6 pt-6 text-center sm:mb-2">
          CREATE TEAM
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 sm:max-w-md sm:self-center"
        >
          <FormField
            label="TEAM NAME"
            id="name"
            type="text"
            placeholder="Enter team name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="w-full">
            <label
              htmlFor="jobField"
              className="block font-bold text-slate-400 mb-2 text-sm"
            >
              JOB FIELD
            </label>
            <div className="flex flex-col w-full">
              {!jobField ? (
                <input
                  type="text"
                  className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
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
                    className="capitalize border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
                  />
                  <button
                    className="m-auto w-1/6 ml-4 h-[80%] text-sm border-2
                  bg-white border-slate-600 hover:bg-blue-200 text-slate-600
                  font-bold p-auto rounded focus:shadow-outline sm:text-sm"
                    onClick={() => setJobField("")}
                  >
                    Clear
                  </button>
                </div>
              )}
              <div className="relative w-full">
                {results && query && (
                  <ul
                    className="absolute z-10 w-4/5 min-h-fit max-h-40 bg-slate-200 
                border-2 border-bluegray rounded overflow-auto pl-2"
                  >
                    {results.length ? (
                      results.map((item) => (
                        <a
                          key={item}
                          href="/"
                          className="no-underline text-black"
                          onClick={(e) => handleSelect(e, item)}
                        >
                          <li className="hover:bg-slate-300 capitalize">
                            {item}
                          </li>
                        </a>
                      ))
                    ) : (
                      <NullInfo />
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <label
              htmlFor="description"
              className="block font-bold text-slate-400 mb-2 text-sm"
            >
              TEAM CREDO
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
