import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { InsightsDataType } from "../../type-definitions";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Blue", "Green", "Purple"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(54, 162, 235)",
        "rgba(75, 192, 192)",
        "rgba(153, 102, 255)",
      ],
    },
  ],
};

const InsightsDoughnut = ({
  insightsData,
}: {
  insightsData: InsightsDataType;
}) => {
  return <Doughnut data={data} />;
};

export default InsightsDoughnut;
