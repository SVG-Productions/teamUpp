import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useParams } from "react-router-dom";

const UserAuthorization = ({ children }) => {
  const { authedUser } = useAuth();
  const { username } = useParams();
  const isAuthorizedUser = authedUser.username === username;
  return isAuthorizedUser ? <>{children}</> : <Navigate to={`/${username}`} />;
};

export default UserAuthorization;
