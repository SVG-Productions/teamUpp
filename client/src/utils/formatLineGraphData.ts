import dayjs from "dayjs";
import { InsightsDataType } from "../../type-definitions";

const formatLineGraphData = (insightData: InsightsDataType) => {
  const months = [
    dayjs().subtract(4, "month").format("MMM"),
    dayjs().subtract(3, "month").format("MMM"),
    dayjs().subtract(2, "month").format("MMM"),
    dayjs().subtract(1, "month").format("MMM"),
    dayjs().format("MMM"),
  ];

  let totalCount = [0, 0, 0, 0, 0];

  insightData.totalApplications.forEach((date: string) => {
    const applicationMonth = dayjs(date).format("MMM");
    if (months.includes(applicationMonth)) {
      totalCount[months.indexOf(applicationMonth)]++;
    }
  });

  let acceptedCount = [0, 0, 0, 0, 0];

  insightData.accepted.forEach((date: string) => {
    const applicationMonth = dayjs(date).format("MMM");
    if (months.includes(applicationMonth)) {
      acceptedCount[months.indexOf(applicationMonth)]++;
    }
  });

  return { months, totalCount, acceptedCount };
};

export default formatLineGraphData;
