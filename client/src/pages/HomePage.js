import { Navigate } from "react-router-dom";
import axios from "axios";

import AuthedLayout from "../components/AuthedLayout";
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
  const { data } = await axios.get("/api/session");
  if (data) {
    const userTeamsData = await axios.get(`/api/users/${data.id}/user-teams`);
    const userTeams = userTeamsData.data.filter(
      (team) => team.status !== "invited" && team.status !== "requested"
    );
    const invites = userTeamsData.data.filter(
      (team) => team.status === "invited"
    );
    return { userTeams, invites };
  }
  return null;
};
