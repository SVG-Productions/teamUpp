import { ListingType } from "../../type-definitions";

const getInisghtData = (listingData: ListingType[]) => {
  //total applications made
  const totalApplications = listingData.length;

  //total applications that have been accepted
  const totalAccepted = listingData.filter(
    (listing) =>
      listing.appStatus !== "applied" && listing.appStatus !== "archived"
  ).length;

  //total offers made
  const totalOffers = listingData.filter(
    (listing) => listing.appStatus === "offer made"
  ).length;

  //total archived applications
  const totalArchived = listingData.filter(
    (listing) => listing.appStatus === "archived"
  ).length;

  return { totalApplications, totalAccepted, totalOffers, totalArchived };
};

export default getInisghtData;
