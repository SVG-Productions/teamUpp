const filterTeams = (teams, filterBy) => {
  if (!filterBy) {
    return teams;
  }
  return teams.filter((team) => team.jobField === filterBy);
};

export default filterTeams;
