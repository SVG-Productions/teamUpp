import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";

const TeamSettingsPage = () => {
  const { teamData, teammatesData } = useLoaderData();
  const team = teamData.data;
  const isOwner = teammatesData.data
    .filter((tm) => tm.status === "owner")
    .reduce((acc, tm) => {
      acc.push(tm.id);
      return acc;
    }, [])
    .includes(authedUser.id);
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(team.name || "");
  const [jobField, setJobField] = useState(team.jobField || "");
  const [description, setDescription] = useState(team.description || "");
  const [isPrivate, setIsPrivate] = useState(team.isPrivate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = { name, jobField, description, isPrivate };

    await axios.patch(`/api/teams/${team.id}`, updates);
    navigate(`/teams/${team.id}`);
  };

  return (
    <div className="h-full">
      <div className="relative">
        <AuthedPageTitle>Teams / {team.name} / Settings</AuthedPageTitle>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow"
        >
          {isOwner && (
            <NavLink
              className="absolute top-0 right-2 sm:-top-16 sm:right-0 border-2 border-red-500 hover:bg-red-200 text-xs font-bold text-red-500 py-2 px-2 mt-2 rounded focus:shadow-outline"
              to={`/teams/${team.id}/settings/delete-team`}
            >
              Delete Team
            </NavLink>
          )}
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
              <FormField
                label="Job Field"
                id="jobField"
                type="text"
                placeholder={jobField}
                value={jobField}
                onChange={(e) => setJobField(e.target.value)}
              />
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
          <div className="flex flex-col">
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
    </div>
  );
};

export default TeamSettingsPage;
