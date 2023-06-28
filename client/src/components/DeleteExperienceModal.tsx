import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import React from "react";
import { ListingType, TeamType } from "../../type-definitions";

const DeleteExperienceModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const { teamData, listingData, experienceData } = useLoaderData() as {
    teamData: TeamType;
    listingData: ListingType;
    experienceData: any;
  };
  const navigate = useNavigate();

  const handleDeleteExperience = async () => {
    try {
      const response = await axios.delete(
        `/api/experiences/${experienceData.id}`
      );
      handleModal(false);
      navigate(`/teams/${teamData.id}/listings/${listingData.id}`);
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
      handleModal(false);
    }
  };

  return (
    <DeleteModalLayout
      content="experience"
      handleDelete={handleDeleteExperience}
      handleModal={handleModal}
    />
  );
};

export default DeleteExperienceModal;
