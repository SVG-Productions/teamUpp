import axios from "axios";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import React from "react";
import { TeamType } from "../../type-definitions";

const DeleteTeamModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const { teamData } = useRouteLoaderData("teamSettings") as {
    teamData: TeamType;
  };
  const navigate = useNavigate();

  const handleDeleteTeam = async () => {
    try {
      const response = await axios.delete(`/api/teams/${teamData.id}`);
      navigate("/teams");
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
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
