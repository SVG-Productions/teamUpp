import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FavoriteButton = ({ listing, size }) => {
  const { userData } = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(
    userData.favorites
      .reduce((acc, fav) => {
        acc.push(fav.id);
        return acc;
      }, [])
      .includes(listing.id)
  );

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      try {
        await axios.delete(`/api/listings/${listing.id}/favorites`);
        setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post(`/api/listings/${listing.id}/favorites`);
        setIsFavorite(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <FontAwesomeIcon
      icon={faStar}
      onClick={handleToggleFavorite}
      size={size}
      className={`cursor-pointer hover:stroke-2 hover:stroke-black ${
        isFavorite ? "text-yellow-400" : "text-slate-400"
      }`}
    />
  );
};

export default FavoriteButton;
