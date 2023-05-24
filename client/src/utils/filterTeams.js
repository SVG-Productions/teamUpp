const filterTeams = (teams, filterBy) => {
  if (!filterBy.length) {
    return teams;
  }
  return teams.filter((team) => filterBy.includes(team.jobField));
};

export default filterTeams;
