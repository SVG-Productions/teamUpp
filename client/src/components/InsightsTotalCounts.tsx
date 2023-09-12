import React from "react";

const InsightsTotalCounts = (data: any) => {
  return (
    <div>
      <div>Total applications: {data.data.totalApplications.length}</div>
      <div>Total accepted: {data.data.accepted.length}</div>
      <div>Total offers made: {data.data.offersMade.length}</div>
      <div>Total archived: {data.data.archived.length}</div>
    </div>
  );
};

export default InsightsTotalCounts;
