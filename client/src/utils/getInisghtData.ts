import { ListingType } from "../../type-definitions";

const getInisghtData = (listingData: ListingType[]) => {
  console.log("in util");
  const totalApplications = listingData.length;

  return { totalApplications };
};

export default getInisghtData;
