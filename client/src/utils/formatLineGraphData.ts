import dayjs from "dayjs";

const formatLineGraphData = (insightData: {
  accepted: string[];
  archived: string[];
  offerMade: string[];
  totalApplications: string[];
}) => {
  const date = dayjs().format("MMM");

  console.log(date);
};

export default formatLineGraphData;
