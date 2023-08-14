import React, { useEffect, useState, useRef } from "react";
import ModalLayout from "../layouts/ModalLayout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faCircleInfo,
  faEllipsisH,
  faFolder,
  faLink,
  faLocationDot,
  faSackDollar,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";
import { formatSalary } from "../utils/formatSalary";
import { formatGeneralDate } from "../utils/dateFormatters";
import useOnClickOutside from "../hooks/useOnClickOutside";
import DeleteListingModal from "./DeleteListingModal";
import { useBoard } from "../context/BoardContext";
import BoardAppDetail from "./BoardAppDetail";
import BoardAppShareSubmenu from "./BoardAppShareSubmenu";
import BoardAppDescription from "./BoardAppDescription";
import BoardAppCompensation from "./BoardAppCompensation";
import BoardAppStatus from "./BoardAppStatus";

const BoardAppDetailsModal = ({
  handleModal,
  app,
}: {
  handleModal: (bool: boolean) => void;
  app: any;
}) => {
  const { boardData, setBoardData } = useBoard();
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAppSubmenu, setShowAppSubmenu] = useState(false);
  const [showDeleteAppModal, setShowDeleteAppModal] = useState(false);

  const submenuRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(submenuRef, () => setShowAppSubmenu(false));

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${app.id}`);
      setAppData(data);
      setLoading(false);
    };
    fetchListingData();
  }, [app.id]);

  const handleDeleteAppState = () => {
    setBoardData((prev: any) => {
      const { [app.id]: deletedApp, ...remainingApps } = prev.apps;
      const newState = {
        ...prev,
        columns: {
          ...prev.columns,
          [app.statusId]: {
            ...prev.columns[app.statusId],
            appIds: prev.columns[app.statusId].appIds.filter(
              (id: string) => id !== app.id
            ),
          },
        },
        apps: remainingApps,
      };
      return newState;
    });
    handleModal(false);
  };

  const handleCloseModals = () => {
    setShowDeleteAppModal(false);
    handleModal(false);
  };

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div
        className="flex flex-col bg-primary w-full h-full max-w-5xl
      p-5 mx-auto z-10 sm:h-3/5 sm:rounded-[4px] sm:shadow-lg"
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {showDeleteAppModal && (
              <DeleteListingModal
                handleModals={handleCloseModals}
                handleModal={setShowDeleteAppModal}
                handleState={handleDeleteAppState}
                id={appData.id}
              />
            )}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-row mr-4 items-center sm:flex-row">
                <h2 className="sm:text-2xl font-medium text-center">
                  {appData.companyName} - {appData.jobTitle}
                </h2>
                <span className="bg-secondary font-bold capitalize text-secondary rounded-sm text-sm py-0.5 px-1 ml-4">
                  {boardData.apps[appData.id].appStatus}
                </span>
              </div>
              <div className="relative flex items-center gap-5 sm:self-start">
                <BoardAppShareSubmenu
                  appData={appData}
                  setAppData={setAppData}
                />
                <FontAwesomeIcon
                  size="lg"
                  icon={faEllipsisH}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => setShowAppSubmenu(true)}
                />
                {showAppSubmenu && (
                  <div
                    ref={submenuRef}
                    className="absolute flex flex-col top-6 right-3 z-10"
                  >
                    <div className="w-0 h-0 self-end mr-6 border-8 border-borderprimary border-t-0 border-l-transparent border-r-transparent sm:self-center" />
                    <div className="flex flex-col w-fit bg-secondary border border-borderprimary rounded-[2%] text-sm shadow-md">
                      <button
                        onClick={() => {
                          setShowAppSubmenu(false);
                          setShowDeleteAppModal(true);
                        }}
                        className="flex p-2 no-underline text-primary hover:bg-highlightSecondary"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mr-2 self-center"
                        />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                <FontAwesomeIcon
                  size="lg"
                  icon={faXmark}
                  className="cursor-pointer rounded-sm hover:text-secondary"
                  onClick={() => handleModal(false)}
                />
              </div>
            </div>
            <div
              id="main"
              className="flex flex-col h-fit sm:gap-4 sm:flex-row sm:h-[90%]"
            >
              <div
                id="right"
                className="flex flex-col gap-2 w-full p-1 sm:w-[45%]"
              >
                <div
                  id="details"
                  className="sm:border sm:border-borderprimary rounded-[4px] sm:mt-2"
                >
                  <div className="flex py-2 items-center justify-between border-b border-borderprimary sm:px-4 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="text-blue-500"
                      />
                      <h3 className="font-medium">Details</h3>
                    </div>
                    <span className="text-tertiary text-xs">
                      Applied {formatGeneralDate(appData.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 p-3">
                    <BoardAppDetail
                      title="Company"
                      value={appData.companyName}
                      name="companyName"
                      appId={appData.id}
                      setAppData={setAppData}
                      icon={faBuilding}
                      iconColor="text-violet-500"
                    />
                    <BoardAppDetail
                      title="Job title"
                      value={appData.jobTitle}
                      name="jobTitle"
                      appId={appData.id}
                      setAppData={setAppData}
                      icon={faBriefcase}
                      iconColor="text-green-500"
                    />
                    <BoardAppDetail
                      title="Location"
                      value={appData.location}
                      name="location"
                      appId={appData.id}
                      setAppData={setAppData}
                      icon={faLocationDot}
                      iconColor="text-red-500"
                    />
                    <BoardAppDetail
                      title="Application link"
                      value={appData.jobLink}
                      name="jobLink"
                      appId={appData.id}
                      setAppData={setAppData}
                      icon={faLink}
                      iconColor="text-blue-500"
                    />
                    <BoardAppCompensation
                      title="Compensation"
                      value={formatSalary(
                        appData.salaryAmount,
                        appData.salaryFrequency
                      )}
                      appId={appData.id}
                      setAppData={setAppData}
                      amount={appData.salaryAmount}
                      frequency={appData.salaryFrequency}
                      icon={faSackDollar}
                      iconColor="text-yellow-500"
                    />
                    <BoardAppStatus
                      appData={appData}
                      icon={faFolder}
                      iconColor="text-orange-500"
                    />
                  </div>
                </div>
              </div>
              <div
                id="left"
                className="flex flex-col w-full p-1 mb-6 pr-3 gap-3 sm:overflow-y-auto sm:w-[55%] sm:mb-0"
              >
                <BoardAppDescription
                  value={appData.jobDescription}
                  name="jobDescription"
                  title="Job description"
                  appId={appData.id}
                  setAppData={setAppData}
                />
                <BoardAppDescription
                  value={appData.companyDetails}
                  name="companyDetails"
                  title="Company details"
                  appId={appData.id}
                  setAppData={setAppData}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
