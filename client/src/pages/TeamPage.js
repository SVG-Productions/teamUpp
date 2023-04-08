import { useNavigate } from "react-router-dom";
import { useLoaderData, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const TeamPage = () => {
  const { authedUser } = useAuth();
  const { singleTeamData } = useLoaderData();
  const navigate = useNavigate();
  const { name, jobField, description } = singleTeamData.data.team;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser]);

  useEffect(() => {
    const getUserTeams = async () => {
      const response = await axios.get(`/api/users/${authedUser.id}/teams`);
      setTeams(response.data.teams);
    };
    getUserTeams();
  }, [authedUser.id]);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{jobField}</p>
        <p>{description}</p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Your Teams</h1>
        {teams.map((team, index) => {
          return (
            <NavLink to={`/teams/${team.id}`} key={index}>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{team.name}</h1>
                <p>{team.jobField}</p>
                <p>{team.description}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPage;
