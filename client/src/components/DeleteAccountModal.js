import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const DeleteAccountModal = ({ handleModal }) => {
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("/api/session/user");
      logout();
    } catch (error) {
      toast.error("Oops! Problem deleting account.", basicToast);
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
