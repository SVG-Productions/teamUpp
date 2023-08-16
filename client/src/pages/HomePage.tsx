import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../components/Landing";

export const HomePage = () => {
  const { authedUser } = useAuth();
  if (authedUser) {
    <Navigate to={`/${authedUser.username}/apps/board`} />;
  }

  return <Landing />;
};
