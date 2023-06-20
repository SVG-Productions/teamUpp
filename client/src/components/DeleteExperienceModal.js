import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const DeleteExperienceModal = ({ handleModal }) => {
  const { teamData, listingData, experienceData } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteExperience = async () => {
    try {
      const response = await axios.delete(
        `/api/experiences/${experienceData.id}`
      );
      handleModal(false);
      navigate(`/teams/${teamData.id}/listings/${listingData.id}`);
      toast.success(response.data.message, basicToast);
    } catch (error) {
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
