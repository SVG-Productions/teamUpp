import { Navigate } from "react-router-dom";
import axios from "axios";

import AuthedLayout from "../components/AuthedLayout";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
import shuffle from "../utils/shuffleArray";

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
    const recommendedTeams = shuffle(userResponse.data.recommendedTeams).slice(
      0,
      4
    );
    const userTeams = userResponse.data.teams.filter(
      (team) => team.status !== "invited" && team.status !== "requested"
    );
    const invites = userResponse.data.teams.filter(
      (team) => team.status === "invited"
    );
    const { recentActivity } = userResponse.data;
    return { userTeams, invites, recommendedTeams, recentActivity };
  } catch {
    return null;
  }
};
