import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { jobFieldsData } from "../utils/jobFieldsData";

export const CreateTeamPage = () => {
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
    <div className="h-full">
      <AuthedPageTitle
        links={[{ to: `/teams`, label: "Teams" }, { label: "Create-Team" }]}
      />
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow"
        >
          <div className="sm:w-2/3">
            <FormField
              label="Team Name"
              id="name"
              type="text"
              placeholder="Enter team name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full">
              <label
                htmlFor="jobField"
                className="block font-semibold text-slate-600 mb-2 text-sm"
              >
                Job Field
              </label>
              <div className="flex w-full">
                <div className="flex flex-col w-full">
                  {!jobField ? (
                    <input
                      type="text"
                      className="border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
                      id="jobField"
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
                        onClick={() => setJobField("")}
                        className="m-auto w-1/6 ml-4 h-[80%] text-sm sm:text-sm border-2 bg-white border-slate-600 hover:bg-blue-200 text-slate-600 font-bold p-auto rounded focus:shadow-outline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  <div>
                    {results && query && (
                      <ul className="fixed z-10 bg-slate-200 w-1/4 h-40 overflow-auto capitalize">
                        {results.map((item) => (
                          <a
                            key={item}
                            href="/"
                            onClick={(e) => handleSelect(e, item)}
                          >
                            <li className="hover:bg-slate-300">{item}</li>
                          </a>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <label
              htmlFor="description"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              Team Credo
            </label>
            <textarea
              id="description"
              rows="11"
              cols="50"
              placeholder="Describe team and its focus..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              required={false}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink
              to="/teams"
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
    </div>
  );
};
