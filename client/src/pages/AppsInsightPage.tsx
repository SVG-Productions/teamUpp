import axios from "axios";
import React from "react";
import { Params, useLoaderData } from "react-router-dom";
import { UserType } from "../../type-definitions";

export const AppsInsightPage = () => {
  const { userData } = useLoaderData() as { userData: UserType };
  console.log(userData);
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
