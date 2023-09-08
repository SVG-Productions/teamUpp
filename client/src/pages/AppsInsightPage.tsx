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
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly application totals",
      },
    },
  };

  const labels = formattedData.months;

  const data = {
    labels,
    datasets: [
      {
        label: "Applications made",
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: [],
        borderColor: "rgba(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div>
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
