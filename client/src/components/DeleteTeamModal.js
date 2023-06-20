import axios from "axios";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const DeleteTeamModal = ({ handleModal }) => {
  const { teamData } = useRouteLoaderData("teamSettings");
  const navigate = useNavigate();

  const handleDeleteTeam = async () => {
    try {
      const response = await axios.delete(`/api/teams/${teamData.id}`);
      navigate("/teams");
      toast.success(response.data.message, basicToast);
    } catch (error) {
      toast.error(error.response.data.message, basicToast);
      handleModal(false);
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
