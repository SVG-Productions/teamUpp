import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLoaderData, useParams } from "react-router-dom";

const TeamAdminAuthorization = ({ children, owner = false }) => {
  const { authedUser } = useAuth();
  const { teamId } = useParams();
  const { teamData } = useLoaderData();

  const isAuthorizedUser = teamData.admins.some((a) => a.id === authedUser.id);

  return isAuthorizedUser ? (
    <>{children}</>
  ) : (
    <Navigate to={`/teams/${teamId}`} />
  );
};

export default TeamAdminAuthorization;
