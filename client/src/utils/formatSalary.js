export const formatSalary = (salaryAmount, salaryFrequency) => {
  if (!salaryAmount || !salaryFrequency) {
    return "Not available";
  }

  const sa = "$" + Number(salaryAmount).toLocaleString("en-US");
  let sf;

  if (salaryFrequency === "yearly") {
    sf = "/yr";
  }
  if (salaryFrequency === "monthly") {
    sf = "/mo";
  }
  if (salaryFrequency === "hourly") {
    sf = "/hr";
  }

  return sa + sf;
};
