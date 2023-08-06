import React from "react";
import { Params } from "react-router-dom";
import axios from "axios";

import { AuthedLayout } from "../layouts/AuthedLayout";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";
import Landing from "../components/Landing";
import UnauthedLayout from "../layouts/UnauthedLayout";

export const HomePage = () => {
  const { authedUser } = useAuth();

  return (
    <>
      {authedUser ? (
        <AuthedLayout>
          <Dashboard />
        </AuthedLayout>
      ) : (
        <UnauthedLayout>
          <Landing />
        </UnauthedLayout>
      )}
    </>
  );
};

export const homeLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const authResponse = await axios.get("/api/auth");
  if (!authResponse.data) {
    return null;
  }
  const userResponse = await axios.get("/api/users/user");
  const userData = userResponse.data;
  return { userData };
};
