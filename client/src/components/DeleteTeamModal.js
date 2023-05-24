import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "./DeleteModalLayout";

const DeleteListingModal = ({ handleModal }) => {
  const { team } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteTeam = async () => {
    await axios.delete(`/api/teams/${team.id}`);
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
