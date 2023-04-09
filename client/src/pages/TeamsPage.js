import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TeamsPage = () => {
  const { authedUser } = useAuth();

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return <div>TEAMS</div>;
};

export default TeamsPage;
