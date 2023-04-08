import { NavLink, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const TeamsPage = () => {
  const { authedUser } = useAuth();
  const { allTeamsData } = useLoaderData();
  const navigate = useNavigate();
  const { teams } = allTeamsData.data;

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">All Teams</h1>
      <div className="flex flex-col">
        {teams.map((team, index) => (
          <NavLink
            to={`/teams/${team.id}`}
            className="bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
            key={`${team.name}-${index}`}
          >
            {team.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
