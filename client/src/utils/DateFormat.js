const formatDate = (date) => {
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString([], options);
  };

  const DateFormat = ({ date }) => {
    return formatDate(date);
  };

  export default DateFormat;
