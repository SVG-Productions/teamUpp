import React from "react";
import { Line } from "react-chartjs-2";
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
import formatLineGraphData from "../utils/formatLineGraphData";
import { InsightsDataType } from "../../type-definitions";
import { useAuth } from "../context/AuthContext";
import { text } from "stream/consumers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InsightsLineGraph = ({
  insightsData,
}: {
  insightsData: InsightsDataType;
}) => {
  const { theme } = useAuth();

  const formattedData = formatLineGraphData(insightsData);
  const labels = formattedData.months;

  const colorClass = document.querySelector(`.${theme}`);
  const style = colorClass ? getComputedStyle(colorClass) : null;
  const borderPrimary = style?.getPropertyValue("--color-border-primary");
  const textSecondary = style?.getPropertyValue("--color-text-secondary");

  const data = {
    labels,
    datasets: [
      {
        label: "Applications made",
        data: formattedData.totalCount,
        borderColor: "rgba(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Accepted",
        data: formattedData.acceptedCount,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235)",
      },
    ],
  };
  const options = {
    tension: 0.4,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: borderPrimary,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 12,
          color: textSecondary,
        },
      },
      // title: {
      //   display: true,
      //   text: "Monthly application totals",
      // },
    },
  };
  return <Line options={options} data={data} />;
};

export default InsightsLineGraph;
