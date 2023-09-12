import axios from "axios";
import React from "react";
import { Params, useLoaderData } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import formatLineGraphData from "../utils/formatLineGraphData";
import InsightsTotalCounts from "../components/InsightsTotalCounts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const AppsInsightPage = () => {
  const { insightsData } = useLoaderData() as { insightsData: any };

  const formattedData = formatLineGraphData(insightsData);

  const options = {
    tension: 0.5,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      // title: {
      //   display: true,
      //   text: "Monthly application totals",
      // },
    },
  };

  const labels = formattedData.months;

  const data = {
    labels,
    datasets: [
      {
        label: "Applications made",
        data: formattedData.totalCount,
        borderColor: "rgba(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Accepted",
        data: formattedData.acceptedCount,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div>
      <InsightsTotalCounts data={insightsData} />
      <Line options={options} data={data} />
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
