const formatJoinDate = (date) => {
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return month + " " + year;
};

export default formatJoinDate;
