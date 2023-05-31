import { Navigate } from "react-router-dom";
import axios from "axios";

import AuthedLayout from "../layouts/AuthedLayout";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";

export const HomePage = () => {
  const { authedUser } = useAuth();
  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthedLayout>
      <Dashboard />
    </AuthedLayout>
  );
};

export const homeLoader = async ({ request, params }) => {
  try {
    const userResponse = await axios.get("/api/session/user");
    const userData = userResponse.data;
    return { userData };
  } catch {
    return null;
  }
};
