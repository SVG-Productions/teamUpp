import dayjs from "dayjs";

const formatLineGraphData = (insightData: {
  accepted: string[];
  archived: string[];
  offerMade: string[];
  totalApplications: string[];
}) => {
  const months = [
    dayjs().subtract(4, "month").format("MMM"),
    dayjs().subtract(3, "month").format("MMM"),
    dayjs().subtract(2, "month").format("MMM"),
    dayjs().subtract(1, "month").format("MMM"),
    dayjs().format("MMM"),
  ];

  let totalCount = [0, 0, 0, 0, 0];

  insightData.totalApplications.forEach((date, i) => {
    const applicationMonth = dayjs(date).format("MMM");
    if (months.includes(applicationMonth)) {
      totalCount[months.indexOf(applicationMonth)]++;
    }
  });

  return { months, totalCount };
};

export default formatLineGraphData;
