  const formatDate = (date) => {
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString([], options);
  };

  export default formatDate
