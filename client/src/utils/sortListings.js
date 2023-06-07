const sortListings = (listings, sortBy, isSortDown) => {
  let sortedListings = [...listings];
  if (sortBy === "company") {
    isSortDown &&
      sortedListings.sort((a, b) => a.companyName.localeCompare(b.companyName));

    !isSortDown &&
      sortedListings.sort(
        (a, b) => -1 * a.companyName.localeCompare(b.companyName)
      );
    return sortedListings;
  } else if (sortBy === "position") {
    isSortDown &&
      sortedListings.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));

    !isSortDown &&
      sortedListings.sort((a, b) => -1 * a.jobTitle.localeCompare(b.jobTitle));
    return sortedListings;
  } else if (sortBy === "username") {
    isSortDown &&
      sortedListings.sort((a, b) => a.username.localeCompare(b.username));

    !isSortDown &&
      sortedListings.sort((a, b) => -1 * a.username.localeCompare(b.username));
    return sortedListings;
  } else if (sortBy === "date") {
    isSortDown &&
      sortedListings.sort(
        (a, b) => -1 * a.createdAt.localeCompare(b.createdAt)
      );

    !isSortDown &&
      sortedListings.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
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
