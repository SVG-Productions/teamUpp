import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";

const DeleteListingModal = ({ handleModal }) => {
  const { listingData, teamData } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteListing = async () => {
    await axios.delete(`/api/listings/${listingData.id}`);
    navigate(`/teams/${teamData.id}`);
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
