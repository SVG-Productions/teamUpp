import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { ListingType, TeamType } from "../../type-definitions";
import React from "react";

const DeleteListingModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const { listingData, teamData } = useLoaderData() as {
    listingData: ListingType;
    teamData: TeamType;
  };
  const navigate = useNavigate();

  const handleDeleteListing = async () => {
    try {
      const response = await axios.delete(`/api/listings/${listingData.id}`);
      navigate(`/teams/${teamData.id}`);
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      handleModal(false);
      toast.error(error.response.data.message, basicToast);
    }
  };

  return (
    <DeleteModalLayout
      content="listing"
      handleDelete={handleDeleteListing}
      handleModal={handleModal}
    />
  );
};

export default DeleteListingModal;
