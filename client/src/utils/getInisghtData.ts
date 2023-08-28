import { ListingType } from "../../type-definitions";

const getInisghtData = (listingData: ListingType[]) => {
  const totalApplications = listingData.length;

  return { totalApplications };
};

export default getInisghtData;
