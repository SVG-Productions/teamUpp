import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import axios from "axios";

const CreateTeamPage = () => {
  const [name, setName] = useState("");
  const [jobField, setJobField] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = {
      name,
      jobField,
      description,
    };
    const { data: createdTeam } = await axios.post("/api/teams", teamData);
    return <Navigate to={`/teams/${createdTeam.id}`} />;
  };

  return (
    <div className="h-full">
      <AuthedPageTitle>Teams / Create-Team</AuthedPageTitle>
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
            <FormField
              label="Job Field"
              id="jobField"
              type="text"
              placeholder="Enter primary job field..."
              value={jobField}
              onChange={(e) => setJobField(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
