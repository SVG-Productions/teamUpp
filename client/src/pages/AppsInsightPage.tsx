import axios from "axios";
import React from "react";
import { Params, useLoaderData } from "react-router-dom";
import { UserType } from "../../type-definitions";
import getInisghtData from "../utils/getInisghtData";

export const AppsInsightPage = () => {
  const { userData } = useLoaderData() as { userData: UserType };

  console.log(userData);

  const insightData = getInisghtData(userData.applications.listings);

  console.log(insightData);
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
  const userResponse = await axios.get("/api/users/user", {
    params: { apps: "list" },
  });
  const userData = userResponse.data;
  return { userData };
};
