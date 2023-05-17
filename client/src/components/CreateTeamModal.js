import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jobFieldsData } from "../utils/jobFieldsData";
import FormField from "./FormField";
import NullInfo from "./NullInfo";
import ModalLayout from "./ModalLayout";

const CreateTeamModal = ({ handleCreateModal }) => {
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
    <ModalLayout handleClickOut={handleCreateModal}>
      <div className="relative self-start bg-white w-full max-w-lg rounded-sm z-10 p-4 sm:shadow-lg sm:rounded-md sm:self-center">
        <h2 className="text-lg font-bold mb-12 text-center sm:mt-4">
          CREATE TEAM
        </h2>
        <form onSubmit={handleSubmit}>
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
              <div>
                {results && query && (
                  <ul
                    className="absolute z-10 w-3/4 min-h-fit max-h-40 bg-slate-200 
                border-2 border-bluegray rounded overflow-auto pl-2"
                  >
                    {results.length ? (
                      results.map((item) => (
                        <a
                          key={item}
                          href="/"
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
            <textarea
              id="description"
              rows="11"
              cols="50"
              placeholder="Describe team and its focus..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray resize-none"
              required={false}
            />
          </div>
          <div className="flex justify-center mt-6 gap-3">
            <button
              className="w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
            font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
            >
              Create
            </button>
            <div
              className="w-1/3 min-w-[84px] text-sm text-center bg-white hover:bg-gray-300 cursor-pointer border-2 
            text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
              onClick={() => handleCreateModal(false)}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CreateTeamModal;
