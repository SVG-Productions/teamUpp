import axios from "axios";
import React from "react";
import { Params, useLoaderData } from "react-router-dom";
import { UserType } from "../../type-definitions";
import getInisghtData from "../utils/getInisghtData";

export const AppsInsightPage = () => {
  const { insightsData } = useLoaderData() as { insightsData: any };

  console.log(insightsData);
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
  const insightsResponse = await axios.get("/api/users/user/insights");
  const insightsData = insightsResponse.data;
  return { insightsData };
};
