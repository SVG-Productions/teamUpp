const formatJoinDate = (date) => {
  const months = [
    "Jan ",
    "Feb ",
    "Mar ",
    "Apr ",
    "May ",
    "Jun ",
    "Jul ",
    "Aug ",
    "Sep ",
    "Oct ",
    "Nov ",
    "Dec ",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return month + year;
};

export default formatJoinDate;
