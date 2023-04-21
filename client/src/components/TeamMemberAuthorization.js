import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLoaderData, useParams } from "react-router-dom";

const TeamMemberAuthorization = ({ children }) => {
  const { authedUser } = useAuth();
  const { teamId } = useParams();
  const { teammates } = useLoaderData();
  const authedTeammates = teammates
    .filter(
      (tm) =>
        tm.status === "owner" || tm.status === "admin" || tm.status === "member"
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

export default TeamMemberAuthorization;
