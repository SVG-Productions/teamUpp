import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useParams } from "react-router-dom";

const UserAuthorization = () => {
  const { authedUser } = useAuth();
  const { username } = useParams();
  const isAuthorizedUser = authedUser.username === username;
  return isAuthorizedUser ? <Outlet /> : <Navigate to={`/${username}`} />;
};

export default UserAuthorization;
