import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

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
  const [monthsBack, setMonthsBack] = useState(0);
  const { theme } = useAuth();

  const formattedData = formatLineGraphData(insightsData, monthsBack);
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
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgb(239, 68, 68)",
      },
      {
        label: "Accepted",
        data: formattedData.acceptedCount,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgb(59, 130, 246)",
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
      laoyout: {
        padding: 40,
      },
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 12,
          color: textSecondary,
          useBorderRadius: true,
          borderRadius: 2,
        },
      },
      // title: {
      //   display: true,
      //   text: "Monthly application totals",
      // },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
      <div className="flex gap-1 w-full justify-center items-center text-primary">
        <button className="flex p-1 bg-secondary border border-borderprimary rounded-md hover:bg-primary">
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <div className="flex items-center bg-secondary p-1 border border-borderprimary rounded-md">
          <span className="text-xs">
            {labels[0]} - {labels[4]}
          </span>
        </div>
        <button className="flex p-1 bg-secondary border border-borderprimary rounded-md hover:bg-primary">
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </>
  );
};

export default InsightsLineGraph;
