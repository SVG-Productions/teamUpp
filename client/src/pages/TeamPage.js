import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TeamPage = () => {
  const { authedUser } = useAuth();
  const { singleTeamData } = useLoaderData();
  const { name, jobField, description } = singleTeamData.data.team;

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{jobField}</p>
      <p>{description}</p>
    </div>
  );
};

export default TeamPage;
