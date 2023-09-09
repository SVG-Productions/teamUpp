import dayjs from "dayjs";

const formatLineGraphData = (insightData: {
  accepted: string[];
  archived: string[];
  offerMade: string[];
  totalApplications: string[];
}) => {
  const months = [
    dayjs().subtract(4, "month").format("MMMM"),
    dayjs().subtract(3, "month").format("MMMM"),
    dayjs().subtract(2, "month").format("MMMM"),
    dayjs().subtract(1, "month").format("MMMM"),
    dayjs().format("MMMM"),
  ];

  let totalCount = [0, 0, 0, 0, 0];

  insightData.totalApplications.forEach((date) => {
    const applicationMonth = dayjs(date).format("MMMM");
    if (months.includes(applicationMonth)) {
      totalCount[months.indexOf(applicationMonth)]++;
    }
  });

  let acceptedCount = [0, 0, 0, 0, 0];

  insightData.accepted.forEach((date) => {
    const applicationMonth = dayjs(date).format("MMMM");
    if (months.includes(applicationMonth)) {
      acceptedCount[months.indexOf(applicationMonth)]++;
    }
  });

  return { months, totalCount, acceptedCount };
};

export default formatLineGraphData;
