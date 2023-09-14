import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { InsightsDataType } from "../../type-definitions";

ChartJS.register(ArcElement, Tooltip, Legend);

const InsightsDoughnut = ({
  insightsData,
}: {
  insightsData: InsightsDataType;
}) => {
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
          "rgba(54, 162, 235)",
          "rgba(0, 192, 120)",
          "rgba(153, 102, 255)",
        ],
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        // position: "right" as const,
        // align: "start" as const,
        // justify: "end" as const,
        labels: {
          boxWidth: 12,
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default InsightsDoughnut;
