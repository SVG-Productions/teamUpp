import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { jobFieldsData } from "../utils/jobFieldsData";

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
          <NavLink
            className="absolute w-max -top-1 right-0 border-2 bg-white border-red-500 hover:bg-red-200 text-xs font-bold text-red-500 py-2 px-2 mt-2 rounded focus:shadow-outline"
            to={`/teams/${team.id}/settings/delete-team`}
          >
            Delete Team
          </NavLink>
        )}
      </AuthedPageTitle>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow"
        >
          <div className="flex flex-row">
            <div className="sm:w-2/3">
              <FormField
                label="Team Name"
                id="name"
                type="text"
                placeholder={name}
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
                          Change
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
            <div className="flex flex-col items-center justify-center w-1/3">
              <label
                className="block font-semibold text-slate-600 mb-2 text-sm text-center"
                htmlFor="isPublic"
              >
                Team Public?
              </label>
              <input
                id="isPublic"
                type="checkbox"
                defaultChecked={!isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
                className="w-5 h-5 mt-2"
              />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <label
              htmlFor="credo"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              Team Credo
            </label>
            <textarea
              id="description"
              rows="11"
              cols="50"
              placeholder={description || "Describe team and its focus..."}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              required={false}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink
              to={`/teams/${team.id}`}
              className="w-1/4 min-w-[84px] text-sm sm:text-base text-center border bg-white border-slate-600 hover:bg-red-200 text-slate-600 font-bold py-2 px-4 rounded focus:shadow-outline"
            >
              Cancel
            </NavLink>
            <button className="w-1/4 min-w-[84px] text-sm sm:text-base border bg-white border-slate-600 hover:bg-blue-200 text-slate-600 font-bold py-2 px-4 rounded focus:shadow-outline">
              Save
            </button>
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
