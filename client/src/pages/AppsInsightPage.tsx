import axios from "axios";
import React from "react";
import { Params, useLoaderData } from "react-router-dom";
import InsightsTotalCounts from "../components/InsightsTotalCounts";
import InsightsLineGraph from "../components/InsightsLineGraph";
import InsightsDoughnut from "../components/InsightsDoughnut";
import { InsightsDataType } from "../../type-definitions";

export const AppsInsightPage = () => {
  const { insightsData } = useLoaderData() as {
    insightsData: InsightsDataType;
  };

  return (
    <>
      <InsightsTotalCounts data={insightsData} />
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        <div className="sm:w-2/3">
          <InsightsLineGraph insightsData={insightsData} />
        </div>
        <div className="w-1/2 sm:w-1/3">
          <InsightsDoughnut insightsData={insightsData} />
        </div>
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
