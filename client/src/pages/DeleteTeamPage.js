import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";

const DeleteTeamPage = () => {
  const { teamData } = useLoaderData();
  const team = teamData.data;

  const navigate = useNavigate();

  const handleDelete = () => {
    navigate("/teams");
  };

  return (
    <>
      <AuthedPageTitle>
        Teams/ {team.name} / Settings / Delete-Team
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

export default DeleteTeamPage;
