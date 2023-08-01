import React, { useEffect, useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import axios from "axios";

const BoardAppDetailsModal = ({
  handleModal,
  task,
}: {
  handleModal: (bool: boolean) => void;
  task: any;
}) => {
  const [taskData, setTaskData] = useState<any>(null);

  useEffect(() => {
    const fetchListingData = async () => {
      const { data } = await axios.get(`/api/listings/${task.id}`);
      setTaskData(data);
    };
    fetchListingData();
  }, []);

  console.log(taskData);

  return (
    <ModalLayout handleClickOut={handleModal}>
      <div className="bg-primary w-full max-w-lg p-5 mx-auto z-10 sm:rounded-md sm:shadow-lg">
        <h2 className="sm:text-lg font-medium mb-8 sm:mb-4 text-center">
          {task.companyName} - {task.jobTitle}
        </h2>
      </div>
    </ModalLayout>
  );
};

export default BoardAppDetailsModal;
