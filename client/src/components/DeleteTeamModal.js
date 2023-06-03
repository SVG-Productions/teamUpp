import axios from "axios";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";

const DeleteTeamModal = ({ handleModal }) => {
  const { teamData } = useRouteLoaderData("teamSettings");
  const navigate = useNavigate();

  const handleDeleteTeam = async () => {
    try {
      await axios.delete(`/api/teams/${teamData.id}`);
      navigate("/teams");
    } catch (error) {
      toast.error("Oops! Problem deleting team.");
    }
  };

  return (
    <DeleteModalLayout
      content="team"
      handleDelete={handleDeleteTeam}
      handleModal={handleModal}
    />
  );
};

export default DeleteTeamModal;
