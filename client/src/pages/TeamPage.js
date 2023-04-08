import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const TeamPage = () => {
  const { authedUser } = useAuth();
  const { singleTeamData } = useLoaderData();
  const navigate = useNavigate();
  const { name, jobField, description } = singleTeamData.data.team;

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser]);

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{jobField}</p>
      <p>{description}</p>
    </div>
  );
};

export default TeamPage;
