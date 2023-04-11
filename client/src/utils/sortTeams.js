const sortTeams = (teams, sortBy) => {
  let sortedTeams = [...teams];
  if (sortBy === "name") {
    sortedTeams.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return sortedTeams;
  } else if (sortBy === "field") {
    sortedTeams.sort((a, b) => {
      if (a.jobField < b.jobField) {
        return -1;
      }
      if (a.jobField > b.jobField) {
        return 1;
      }
      return 0;
    });
    return sortedTeams;
  } else return teams;
};

export default sortTeams;
