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

  return { months };
};

export default formatLineGraphData;
