import React from "react";
import { Params, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthedLayout } from "../layouts/AuthedLayout";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
import Landing from "../components/Landing";
import UnauthedLayout from "../layouts/UnauthedLayout";

export const HomePage = () => {
  const { authedUser } = useAuth();
  const navigate = useNavigate();
  // if authed user, push to board apps
  if (authedUser) {
    navigate(`/${authedUser.username}/apps/board`);
  }

  return <Landing />;
};
