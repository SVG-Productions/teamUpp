import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";

const DeleteExperienceModal = ({ handleModal }) => {
  const { teamData, listingData, experienceData } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteExperience = async () => {
    await axios.delete(`/api/experiences/${experienceData.id}`);
    handleModal(false);
    navigate(`/teams/${teamData.id}/listings/${listingData.id}`);
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
