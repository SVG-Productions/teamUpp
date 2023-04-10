import { NavLink } from "react-router-dom";
import { useLoaderData, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const TeamsPage = () => {
  const { allTeamsData } = useLoaderData();
  const { teams } = allTeamsData.data;
  const { authedUser } = useAuth();
  const authedUserId = authedUser?.id;
  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    const getUserTeams = async () => {
      const response = await axios.get(`/api/users/${authedUserId}/teams`);
      setUserTeams(response.data.teams);
    };
    getUserTeams();
  }, [authedUserId]);

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

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
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Your Teams</h1>
        {userTeams.map((team) => (
          <NavLink
            to={`/teams/${team.id}`}
            key={team.id}
            className="bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
          >
            {team.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
