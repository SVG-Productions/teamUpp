import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { authedUser } = useAuth();

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return <Dashboard />;
};

export default HomePage;
