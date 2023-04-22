import axios from "axios";
import { useLoaderData } from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FavoriteButton = ({ listing, dimensions }) => {
  const { favorites } = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(
    favorites
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
    <div className="text-yellow-400 pr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer ${dimensions || "h-6 w-6"}`}
        viewBox="0 0 20 20"
        fill={isFavorite ? `currentColor` : "gray"}
        onClick={handleToggleFavorite}
      >
        <path d="M10 14.535l-4.954 3.033 1.182-5.484-3.972-3.44 5.51-.472L10 3.273l2.234 5.899 5.51.472-3.972 3.44 1.182 5.484z" />
      </svg>
    </div>
  );
};

export default FavoriteButton;
