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
    <div className="flex flex-col gap-3 mb-4 sm:mb-6 lg:flex-row">
      <div className="flex gap-3 lg:w-1/2">
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="flex justify-center items-center w-1/5 h-full bg-red-500 rounded-l-md">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-white text-xl lg:text-2xl"
            />
          </div>
          <div className="p-2 sm:p-4">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Applications made:
            </span>
            <br />
            <span className="font-semibold pl-2">
              {data.totalApplications.length}
            </span>
          </div>
        </div>
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="flex justify-center items-center w-1/5 h-full bg-blue-500 rounded-l-md">
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="text-white text-xl lg:text-2xl"
            />
          </div>
          <div className="p-2 sm:p-4">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Total Accepted:
            </span>
            <br />
            <span className="font-semibold pl-2">{data.accepted.length}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 lg:w-1/2">
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="flex justify-center items-center w-1/5 h-full bg-green-500 rounded-l-md">
            <FontAwesomeIcon
              icon={faSackDollar}
              className="text-white text-xl lg:text-2xl"
            />
          </div>
          <div className="p-2 sm:p-4">
            <span className="text-secondary text-xs font-medium sm:text-sm">
              Offers made:
            </span>
            <br />
            <span className="font-semibold pl-2">{data.offersMade.length}</span>
          </div>
        </div>
        <div className="flex w-1/2 border border-borderprimary rounded-md shadow-sm">
          <div className="flex justify-center items-center w-1/5 h-full bg-purple-500 rounded-l-md">
            <FontAwesomeIcon
              icon={faFolderOpen}
              className="text-white text-xl lg:text-2xl"
            />
          </div>
          <div className="p-2 sm:p-4">
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
