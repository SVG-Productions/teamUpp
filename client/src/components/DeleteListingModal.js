import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const DeleteListingModal = ({ handleModal }) => {
  const { listingData, teamData } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteListing = async () => {
    try {
      await axios.delete(`/api/listings/${listingData.id}`);
      navigate(`/teams/${teamData.id}`);
    } catch (error) {
      toast.error("Oops! Problem deleting listing.", basicToast);
    }
  };

  return (
    <DeleteModalLayout
      content="listing"
      handleDelete={handleDeleteListing}
      handleModal={handleModal}
    />
  );
};

export default DeleteListingModal;
