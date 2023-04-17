import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthedPageTitle from "../components/AuthedPageTitle";

export const DeleteTeamPage = () => {
  const { team } = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await axios.delete(`/api/teams/${team.id}`);
    navigate("/teams");
  };

  return (
    <>
      <AuthedPageTitle>
        <NavLink to="/teams" className="hover:underline">
          Teams
        </NavLink>{" "}
        /{" "}
        <NavLink to={`/teams/${team.id}`} className="hover:underline">
          {team.name}
        </NavLink>{" "}
        /{" "}
        <NavLink to={`/teams/${team.id}/settings`} className="hover:underline">
          Settings
        </NavLink>{" "}
        / Delete-Team
      </AuthedPageTitle>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center self-center sm:mt-0 mt-8 w-full px-16 py-24 max-w-xl">
          <p className="sm:text-2xl text-lg text-center">
            Are you sure you want to delete <br />
            <span className="font-bold">{team.name}</span>?
          </p>
          <div className="flex justify-center sm:gap-12 gap-8 mt-32 w-full">
            <NavLink
              to={`/teams/${team.id}/settings`}
              className="w-1/3 min-w-[84px] py-2 px-4 text-sm sm:text-base text-center border-2 border-emerald-500 hover:bg-emerald-200 font-bold text-emerald-500 rounded"
            >
              Cancel
            </NavLink>
            <button
              onClick={handleDelete}
              className="w-1/3 min-w-[84px] py-2 px-4 text-sm sm:text-base text-center border-2 border-red-500 hover:bg-red-200 font-bold text-red-500 rounded"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const deleteTeamLoader = async ({ request, params }) => {
  const { teamId } = params;
  const [teamData, teammatesData] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get(`/api/teams/${teamId}/teammates`),
  ]);
  const team = teamData.data;
  const teammates = teammatesData.data;
  return { team, teammates };
};
