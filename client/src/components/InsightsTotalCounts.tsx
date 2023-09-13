import {
  faFolderOpen,
  faPenToSquare,
  faSackDollar,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const InsightsTotalCounts = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="flex gap-3 mb-3">
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="w-1/5 h-full bg-red-500 rounded-l-md">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div className="p-4 sm:p-6">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Total applications made:
            </span>
            <br />
            <span className="font-semibold pl-2">
              {data.totalApplications.length}
            </span>
          </div>
        </div>
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="w-1/5 h-full bg-blue-500 rounded-l-md">
            <FontAwesomeIcon icon={faSquareCheck} />
          </div>
          <div className="p-4 sm:p-6">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Total accepted:
            </span>
            <br />
            <span className="font-semibold pl-2">{data.accepted.length}</span>
          </div>
        </div>
      </div>
      <div className="mb-4 flex gap-3 sm:mb-6">
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="w-1/5 h-full bg-green-500 rounded-l-md">
            <FontAwesomeIcon icon={faSackDollar} />
          </div>
          <div className="p-4 sm:p-6">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Total offers made:
            </span>
            <br />
            <span className="font-semibold pl-2">{data.offersMade.length}</span>
          </div>
        </div>
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="w-1/5 h-full bg-purple-500 rounded-l-md">
            <FontAwesomeIcon icon={faFolderOpen} />
          </div>
          <div className="p-4 sm:p-6">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Total archived:
            </span>
            <br />
            <span className="font-semibold pl-2">{data.archived.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsTotalCounts;
