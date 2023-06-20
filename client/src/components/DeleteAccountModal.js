import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const DeleteAccountModal = ({ handleModal }) => {
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("/api/session/user");
      logout();
      toast.success(response.data.message);
    } catch (error) {
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
