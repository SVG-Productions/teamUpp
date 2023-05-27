import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DeleteModalLayout from "../layouts/DeleteModalLayout";

const DeleteAccountModal = ({ handleModal }) => {
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    await axios.delete("/api/session/user");
    logout();
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
