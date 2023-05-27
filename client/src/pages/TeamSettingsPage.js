import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { jobFieldsData } from "../utils/jobFieldsData";
import FormToggle from "../components/FormToggle";
import PencilButton from "../components/PencilButton";
import DeleteTeamModal from "../components/DeleteTeamModal";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";

export const TeamSettingsPage = () => {
  const { team, ownerId } = useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const isOwner = authedUser.id === ownerId;

  const [name, setName] = useState(team.name || "");
  const [jobField, setJobField] = useState(team.jobField || "");
  const [description, setDescription] = useState(team.description || "");
  const [isPrivate, setIsPrivate] = useState(team.isPrivate);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const newResults = jobFieldsData.filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setResults(newResults);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = { name, jobField, description, isPrivate };

    await axios.patch(`/api/teams/${team.id}`, updates);
    navigate(`/teams/${team.id}`);
  };

  const handleSelect = (event, selectedItem) => {
    event.preventDefault();
    setJobField(selectedItem);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/teams`, label: "Teams" },
          { to: `/teams/${team.id}`, label: team.name },
          { label: "Settings" },
        ]}
      >
        {isOwner && (
          <button
            className="border-2 border-red-500 hover:bg-red-200 text-xs font-bold text-red-500 p-2 rounded focus:shadow-outline whitespace-nowrap"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Team
          </button>
        )}
      </AuthedPageTitle>
      {isDeleteModalOpen && (
        <DeleteTeamModal handleModal={setIsDeleteModalOpen} />
      )}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="relative max-w-4xl w-full p-6">
          <div className="flex flex-col-reverse sm:flex-row">
            <div className="flex flex-col sm:w-1/2">
              <div className="flex flex-row justify-between sm:mb-14">
                <div className="w-[65%]">
                  <FormField
                    label="TEAM NAME"
                    id="name"
                    type="text"
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <FormToggle
                  id="isTeamPrivate"
                  text="TEAM PRIVATE?"
                  defaultChecked={isPrivate}
                  handleChange={setIsPrivate}
                />
              </div>
              <label
                htmlFor="jobField"
                className="block font-bold text-slate-400 mb-2 text-sm"
              >
                JOB FIELD
              </label>
              {!jobField ? (
                <input
                  type="text"
                  className="border border-black rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 mb-4 sm:mb-8"
                  id="jobField"
                  placeholder="Search job fields"
                  value={query}
                  onChange={handleQueryChange}
                />
              ) : (
                <div className="flex mb-4 items-center sm:mb-8">
                  <input
                    value={jobField}
                    readOnly
                    className="relative capitalize border w-4/5 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
                  />
                  <button
                    onClick={() => setJobField("")}
                    className="w-1/5 ml-4 p-2 text-sm sm:text-sm border bg-bluegray hover:bg-blue-900 text-white font-bold p-auto rounded focus:shadow-outline"
                  >
                    Clear
                  </button>
                </div>
              )}
              <div className="relative">
                {results && query && (
                  <ul className="absolute -top-4 pl-2 w-2/3 z-10 bg-slate-200 max-h-40 rounded-sm overflow-auto capitalize">
                    {results.map((item) => (
                      <a
                        key={item}
                        href="/"
                        className="no-underline text-primary"
                        onClick={(e) => handleSelect(e, item)}
                      >
                        <li className="hover:bg-slate-300 py-1">{item}</li>
                      </a>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center sm:w-1/2 mb-4">
              <p className="block font-bold self-start text-slate-400 mb-4 text-sm sm:ml-16 sm:mb-2">
                TEAM PICTURE
              </p>
              <div className="relative w-40 h-40 rounded-full bg-bluegraylight sm:w-56 sm:h-56 sm:mt-8">
                <PencilButton
                  onClick={() => {}}
                  styling="absolute w-8 h-8 bottom-2 left-2 sm:bottom-4 sm:left-4 bg-slate-900"
                  iconSize="16px"
                  fill="white"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="credo"
              className="block font-semibold text-slate-400 mb-2 text-sm"
            >
              TEAM CREDO
            </label>
            <ReactQuill
              id="credo"
              value={description}
              onChange={setDescription}
              modules={basicModules}
              theme="snow"
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-4 sm:mt-8 sm:justify-end">
            <button
              className="w-1/4 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
              font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
            >
              Save
            </button>
            <NavLink
              to={`/teams/${team.id}`}
              className="no-underline w-1/4 min-w-[84px] text-sm text-center  hover:bg-gray-300 border-2 
              text-primary font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
            >
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export const teamSettingsLoader = async ({ request, params }) => {
  const { teamId } = params;
  const teamResponse = await axios.get(`/api/teams/${teamId}`);
  const { team, teammates } = teamResponse.data;
  const [ownerId] = teammates
    .filter((tm) => tm.status === "owner")
    .reduce((acc, tm) => {
      acc.push(tm.id);
      return acc;
    }, []);
  return { team, teammates, ownerId };
};
