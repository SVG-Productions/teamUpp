const sortListings = (listings, sortBy) => {
  let sortedListings = [...listings];
  if (sortBy === "company") {
    sortedListings.sort((a, b) => {
      if (a.companyName.toLowerCase() < b.companyName.toLowerCase()) {
        return -1;
      }
      if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return sortedListings;
  } else if (sortBy === "position") {
    sortedListings.sort((a, b) => {
      if (a.jobTitle.toLowerCase() < b.jobTitle.toLowerCase()) {
        return -1;
      }
      if (a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return sortedListings;
  } else if (sortBy === "username") {
    sortedListings.sort((a, b) => {
      if (a.username.toLowerCase() < b.username.toLowerCase()) {
        return -1;
      }
      if (a.username.toLowerCase() > b.username.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    return sortedListings;
  } else if (sortBy === "date") {
    sortedListings.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
    return sortedListings;
  } else return listings;
};

export default sortListings;
