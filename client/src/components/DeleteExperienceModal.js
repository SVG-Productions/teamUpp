import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";

const DeleteExperienceModal = ({ handleModal }) => {
  const { team, listing, experience } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteExperience = async () => {
    await axios.delete(`/api/experiences/${experience.id}`);
    handleModal(false);
    navigate(`/teams/${team.id}/listings/${listing.id}`);
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
