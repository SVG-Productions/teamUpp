const sortListings = (listings, sortBy, isSortDown) => {
  let sortedListings = [...listings];
  if (sortBy === "company") {
    {
      isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.companyName.toLowerCase() < b.companyName.toLowerCase()) {
            return -1;
          }
          if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) {
            return -1;
          }
          if (a.companyName.toLowerCase() < b.companyName.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    return sortedListings;
  } else if (sortBy === "position") {
    {
      isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.jobTitle.toLowerCase() < b.jobTitle.toLowerCase()) {
            return -1;
          }
          if (a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.jobTitle.toLowerCase() > b.jobTitle.toLowerCase()) {
            return -1;
          }
          if (a.jobTitle.toLowerCase() < b.jobTitle.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    return sortedListings;
  } else if (sortBy === "username") {
    {
      isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return -1;
          }
          if (a.username.toLowerCase() > b.username.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.username.toLowerCase() > b.username.toLowerCase()) {
            return -1;
          }
          if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    return sortedListings;
  } else if (sortBy === "date") {
    {
      isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedListings.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return -1;
          }
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          return 0;
        });
    }
    return sortedListings;
  } else if (sortBy === "salary") {
    isSortDown &&
      sortedListings.sort((a, b) => b.salaryAmount - a.salaryAmount);

    !isSortDown &&
      sortedListings.sort((a, b) => a.salaryAmount - b.salaryAmount);

    return sortedListings;
  } else return listings;
};

export default sortListings;
