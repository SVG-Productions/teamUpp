import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import DeleteModalLayout from "../layouts/DeleteModalLayout";

const DeleteListingModal = ({ handleModal }) => {
  const { listing, team } = useLoaderData();
  const navigate = useNavigate();

  const handleDeleteListing = async () => {
    await axios.delete(`/api/listings/${listing.id}`);
    navigate(`/teams/${team.id}`);
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
