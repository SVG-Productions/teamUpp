import React, { useEffect, useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEllipsisV,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";

const BoardAppDetailsModal = ({
  handleModal,
  task,
}: {
  handleModal: (bool: boolean) => void;
  task: any;
}) => {
  const [taskData, setTaskData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${task.id}`);
      setTaskData(data);
      setLoading(false);
    };
    fetchListingData();
  }, []);

  console.log(taskData);

  return (
    <ModalLayout handleClickOut={handleModal}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-primary w-full max-w-4xl p-5 mx-auto z-10 sm:rounded-md sm:shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="sm:text-lg font-medium text-center">
              {task.companyName} - {task.jobTitle}
              <span className="bg-secondary text-secondary rounded-sm text-sm p-0.5 ml-4 ">
                {taskData.appStatus}
              </span>
            </h2>
            <div className="flex items-center gap-5">
              <FontAwesomeIcon
                size="lg"
                icon={faEllipsisH}
                className="rounded-sm hover:text-secondary"
              />
              <FontAwesomeIcon
                size="lg"
                icon={faX}
                className="rounded-sm hover:text-secondary"
                onClick={() => handleModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
