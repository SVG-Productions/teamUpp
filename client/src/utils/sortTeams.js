const sortTeams = (teams, sortBy, isSortDown) => {
  let sortedTeams = [...teams];
  if (sortBy === "name") {
    {
      isSortDown &&
        sortedTeams.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedTeams.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
    }
    return sortedTeams;
  } else if (sortBy === "field") {
    {
      isSortDown &&
        sortedTeams.sort((a, b) => {
          if (a.jobField < b.jobField) {
            return -1;
          }
          if (a.jobField > b.jobField) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedTeams.sort((a, b) => {
          if (a.jobField > b.jobField) {
            return -1;
          }
          if (a.jobField < b.jobField) {
            return 1;
          }
          return 0;
        });
    }
    return sortedTeams;
  } else if (sortBy === "userCount") {
    {
      isSortDown &&
        sortedTeams.sort((a, b) => {
          if (a.userCount < b.userCount) {
            return -1;
          }
          if (a.userCount > b.userCount) {
            return 1;
          }
          return 0;
        });
    }
    {
      !isSortDown &&
        sortedTeams.sort((a, b) => {
          if (a.userCount > b.userCount) {
            return -1;
          }
          if (a.userCount < b.userCount) {
            return 1;
          }
          return 0;
        });
    }
    return sortedTeams;
  } else return teams;
};

export default sortTeams;
