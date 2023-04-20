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
  const { data } = await axios.get("/api/session");
  if (data) {
    const [userTeamsData, recommendedTeamsData] = await Promise.all([
      axios.get(`/api/users/${data.id}/user-teams`),
      axios.get(`/api/teams/recommended/${data.id}`),
    ]);

    const recommendedTeams = shuffle(recommendedTeamsData.data).slice(0, 4);
    const userTeams = userTeamsData.data.filter(
      (team) => team.status !== "invited" && team.status !== "requested"
    );
    const invites = userTeamsData.data.filter(
      (team) => team.status === "invited"
    );
    return { userTeams, invites, recommendedTeams };
  }
  return null;
};
