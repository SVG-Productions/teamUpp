import axios from "axios";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import React from "react";

const DeleteListingModal = ({
  handleModal,
  id,
  handleState,
}: {
  handleModal: (bool: boolean) => void;
  id: string;
  handleState?: any;
}) => {
  const handleDeleteListing = async () => {
    try {
      if (handleState) {
        handleState();
      }
      const response = await axios.delete(`/api/listings/${id}`);
      toast.success(response.data.message, basicToast);
      handleModal(false);
    } catch (error: any) {
      handleModal(false);
      toast.error(error.response.data.message, basicToast);
    }
  };

  return (
    <DeleteModalLayout
      content="application"
      handleDelete={handleDeleteListing}
      handleModal={handleModal}
    />
  );
};

export default DeleteListingModal;
