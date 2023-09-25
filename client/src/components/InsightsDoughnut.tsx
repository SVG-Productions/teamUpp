import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { InsightsDataType } from "../../type-definitions";
import { useAuth } from "../context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const InsightsDoughnut = ({
  insightsData,
}: {
  insightsData: InsightsDataType;
}) => {
  const { theme } = useAuth();

  const colorClass = document.querySelector(`.${theme}`);
  const style = colorClass ? getComputedStyle(colorClass) : null;
  const borderPrimary = style?.getPropertyValue("--color-border-primary");
  const textSecondary = style?.getPropertyValue("--color-text-secondary");

  const data = {
    labels: ["Accepted", "Offers made", "Archived"],
    datasets: [
      {
        label: "# of applications",
        data: [
          insightsData.accepted.length,
          insightsData.offersMade.length,
          insightsData.archived.length,
        ],
        backgroundColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(139, 92, 246)",
        ],
        borderColor: borderPrimary,
      },
    ],
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        position: "bottom" as const,
        // align: "start" as const,
        // justify: "end" as const,
        labels: {
          boxWidth: 12,
          color: textSecondary,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: "Application totals",
        color: textSecondary,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default InsightsDoughnut;
