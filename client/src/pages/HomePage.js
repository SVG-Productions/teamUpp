import { Navigate } from "react-router-dom";
import axios from "axios";

import AuthedLayout from "../layouts/AuthedLayout";
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
    const { recentActivity, teammates, invites, teams } = userResponse.data;
    const recommendedTeams = shuffle(userResponse.data.recommendedTeams).slice(
      0,
      4
    );

    return {
      userTeams: teams,
      invites,
      recommendedTeams,
      recentActivity,
      teammates,
    };
  } catch {
    return null;
  }
};
