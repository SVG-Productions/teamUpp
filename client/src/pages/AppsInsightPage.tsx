import axios from "axios";
import React from "react";
import { Params, useLoaderData } from "react-router-dom";
import InsightsTotalCounts from "../components/InsightsTotalCounts";
import InsightsLineGraph from "../components/InsightsLineGraph";
import InsightsDoughnut from "../components/InsightsDoughnut";

export const AppsInsightPage = () => {
  const { insightsData } = useLoaderData() as { insightsData: any };

  return (
    <>
      <InsightsTotalCounts data={insightsData} />
      <InsightsLineGraph insightsData={insightsData} />
      <div>
        <InsightsDoughnut />
      </div>
    </>
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
