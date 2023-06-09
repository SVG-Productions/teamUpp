const sortTeams = (teams, sortBy, isSortDown) => {
  let sortedTeams = [...teams];
  if (sortBy === "name") {
    isSortDown && sortedTeams.sort((a, b) => a.name.localeCompare(b.name));
    !isSortDown &&
      sortedTeams.sort((a, b) => -1 * a.name.localeCompare(b.name));
    return sortedTeams;
  } else if (sortBy === "field") {
    isSortDown &&
      sortedTeams.sort((a, b) => a.jobField.localeCompare(b.jobField));

    !isSortDown &&
      sortedTeams.sort((a, b) => -1 * a.jobField.localeCompare(b.jobField));
    return sortedTeams;
  } else if (sortBy === "userCount") {
    isSortDown && sortedTeams.sort((a, b) => b.userCount - a.userCount);

    !isSortDown && sortedTeams.sort((a, b) => a.userCount - b.userCount);
    return sortedTeams;
  } else return teams;
};

export default sortTeams;
