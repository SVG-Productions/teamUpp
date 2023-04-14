import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLoaderData, useParams } from "react-router-dom";

const TeamAdminAuthorization = ({ children, owner = false }) => {
  const { authedUser } = useAuth();
  const { teamId } = useParams();
  const { teammatesData } = useLoaderData();
  const authedTeammates = teammatesData.data
    .filter((tm) =>
      owner
        ? tm.status === "owner"
        : tm.status === "owner" || tm.status === "admin"
    )
    .reduce((acc, tm) => {
      acc.push(tm.id);
      return acc;
    }, []);
  const isAuthorizedUser = authedTeammates.includes(authedUser.id);

  return isAuthorizedUser ? (
    <>{children}</>
  ) : (
    <Navigate to={`/teams/${teamId}`} />
  );
};

export default TeamAdminAuthorization;
