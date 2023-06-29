import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import React from "react";

const DeleteAccountModal = ({
  handleModal,
}: {
  handleModal: (bool: boolean) => void;
}) => {
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("/api/users/user");
      logout();
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
      handleModal(false);
    }
  };

  return (
    <DeleteModalLayout
      content="account"
      handleDelete={handleDeleteAccount}
      handleModal={handleModal}
    />
  );
};

export default DeleteAccountModal;
