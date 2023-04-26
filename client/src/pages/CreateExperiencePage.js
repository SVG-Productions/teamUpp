import { useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";

export const CreateExperiencePage = () => {
  const [experienceTitle, setExperienceTitle] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");

  const { authedUser } = useAuth();
  const userId = authedUser.id;

  const { team } = useLoaderData();
  const { id: teamId, name } = team;

  const { listing } = useLoaderData();
  const { id: listingId } = listing;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceData = {
      title: experienceTitle,
      content: experienceDescription,
      userId,
      listingId,
    };
    await axios.post("/api/experiences", experienceData);
    navigate(`/teams/${teamId}/listings/${listingId}/experiences`);
  };

  return (
    <>
      <AuthedPageTitle>
        <NavLink to="/teams" className="hover:underline">
          Teams
        </NavLink>{" "}
        /{" "}
        <NavLink to={`/teams/${teamId}`} className="hover:underline">
          {name}
        </NavLink>{" "}
        / Add Experience
      </AuthedPageTitle>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl w-full mt-8 p-6 bg-slate-100 border shadow"
        >
          <div className="sm:w-2/3">
            <FormField
              label="Title"
              id="experienceTitle"
              type="text"
              placeholder="Enter experience title..."
              value={experienceTitle}
              onChange={(e) => setExperienceTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              Experience Description
            </label>
            <textarea
              id="description"
              rows="20"
              cols="50"
              placeholder="Enter experience description..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              value={experienceDescription}
              onChange={(e) => setExperienceDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink
              to={`/teams/${teamId}`}
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
    </>
  );
};

export const createExperienceLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;
  const teamResponse = await axios.get(`/api/teams/${teamId}`);
  const listingResponse = await axios.get(`/api/listings/${listingId}`);

  const { team, teammates } = teamResponse.data;
  const { listing } = listingResponse.data;

  return { team, teammates, listing };
};
