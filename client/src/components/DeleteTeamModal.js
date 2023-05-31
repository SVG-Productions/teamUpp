import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";

const DeleteListingModal = ({ handleModal }) => {
  const { teamData } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteTeam = async () => {
    await axios.delete(`/api/teams/${teamData.id}`);
    navigate("/teams");
  };

  return (
    <DeleteModalLayout
      content="team"
      handleDelete={handleDeleteTeam}
      handleModal={handleModal}
    />
  );
};

export default DeleteListingModal;
