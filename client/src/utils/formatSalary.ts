export const formatSalary = (
  salaryAmount: string | null,
  salaryFrequency: string | null
) => {
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
