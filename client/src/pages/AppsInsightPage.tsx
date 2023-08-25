import axios from "axios";
import React from "react";
import { Params } from "react-router-dom";

export const AppsInsightPage = () => {
  return (
    <div>
      <h1>Application Insights</h1>
    </div>
  );
};

export const appsInsightsLoader = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const userResponse = await axios.get("/api/users/user");
  const userData = userResponse.data;
  return { userData };
};
