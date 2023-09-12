import React from "react";

const InsightsTotalCounts = (data: any) => {
  return (
    <div>
      <div className="flex gap-3 mb-3">
        <div className="w-1/2 p-4 border border-borderprimary rounded-md shadow-sm sm:p-6">
          <span className="text-secondary text-sm font-medium">
            Total applications:
          </span>
          <br />
          <span className="font-semibold pl-2">
            {data.data.totalApplications.length}
          </span>
        </div>
        <div className="w-1/2 p-4 border border-borderprimary rounded-md shadow-sm sm:p-6">
          <span className="text-secondary text-sm font-medium">
            Total accepted:
          </span>
          <br />
          <span className="font-semibold pl-2">
            {data.data.accepted.length}
          </span>
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <div className="w-1/2 p-4 border border-borderprimary rounded-md shadow-sm sm:p-6">
          <span className="text-secondary text-sm font-medium">
            Total offers made:
          </span>
          <br />
          <span className="font-semibold pl-2">
            {data.data.offersMade.length}
          </span>
        </div>
        <div className="w-1/2 p-4 border border-borderprimary rounded-md shadow-sm sm:p-6">
          <span className="text-secondary text-sm font-medium">
            Total archived:
          </span>
          <br />
          <span className="font-semibold pl-2">
            {data.data.archived.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InsightsTotalCounts;
