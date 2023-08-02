import React, { useEffect, useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import {
  faEllipsisH,
  faSortDown,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import { formatSalary } from "../utils/formatSalary";
import { formatGeneralDate } from "../utils/dateFormatters";
import trimUrl from "../utils/trimUrl";

const BoardAppDetailsModal = ({
  handleModal,
  task,
}: {
  handleModal: (bool: boolean) => void;
  task: any;
}) => {
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${task.id}`);
      setAppData(data);
      setLoading(false);
    };
    fetchListingData();
  }, []);

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="flex flex-col bg-secondary w-full h-3/5 max-w-5xl
      p-5 mx-auto z-10 sm:rounded-[4px] sm:shadow-lg"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h2 className="sm:text-xl font-bold text-center">
                  {appData.companyName} - {appData.jobTitle}
                </h2>
                <span className="bg-primary font-bold capitalize text-secondary rounded-sm text-sm py-0.5 px-1 ml-4 ">
                  {appData.appStatus}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <FontAwesomeIcon
                  size="lg"
                  icon={faEllipsisH}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                />
                <FontAwesomeIcon
                  size="lg"
                  icon={faX}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => handleModal(false)}
                />
              </div>
            </div>
            <div id="main" className="flex h-[90%] gap-4">
              <div id="left" className="w-1/2 p-1 overflow-y-auto">
                <div className="mb-4">
                  <h3 className="font-bold text-sm mb-1">Description</h3>
                  <div className="text-sm">{parse(appData.jobDescription)}</div>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Company Details</h3>
                  <div className="text-sm">{parse(appData.companyDetails)}</div>
                </div>
              </div>
              <div id="right" className="flex flex-col gap-2 w-1/2 p-1">
                <div
                  id="details"
                  className="border border-borderprimary rounded-[4px]"
                >
                  <h3 className="text-sm font-semibold py-1 px-3 border-b border-borderprimary">
                    Details
                  </h3>
                  <div className="flex flex-col gap-4 py-1 px-3">
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Company
                      </span>
                      <span className="text-sm">{appData.companyName}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Job title
                      </span>
                      <span className="text-sm">{appData.jobTitle}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Link to application
                      </span>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs"
                        href={appData.jobLink}
                      >
                        {trimUrl(appData.jobLink)}
                      </a>
                    </div>
                    <div className="flex">
                      <span className="text-sm w-2/5 font-semibold">
                        Compensation
                      </span>
                      <span className="text-sm">
                        {formatSalary(
                          appData.salaryAmount,
                          appData.salaryFrequency
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm w-2/5 font-semibold">
                        Current status
                      </span>
                      <button className="flex capitalize text-sm gap-2 rounded-[4px] px-1 py-0.5 bg-buttonPrimary">
                        <span>{appData.appStatus}</span>
                        <FontAwesomeIcon icon={faSortDown} />
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-tertiary text-xs">
                        Applied {formatGeneralDate(appData.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  id="teamShare"
                  className="border h-full border-borderprimary rounded-[4px]"
                >
                  <h3 className="text-sm font-semibold py-1 px-3 border-b border-borderprimary">
                    Share to teams
                  </h3>
                  <div className="flex flex-col gap-4 py-1 px-3">
                    Select teams
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
