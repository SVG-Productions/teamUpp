import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TeamPage = () => {
  const { authedUser } = useAuth();

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return <div>SINGLE TEAM PAGE</div>;
};

export default TeamPage;
