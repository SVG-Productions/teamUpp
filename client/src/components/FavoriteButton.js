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
  const { authedUser } = useAuth();

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      try {
        await axios.delete(`/api/users/${authedUser.id}/favorites`, {
          data: {
            listingId: listing.id,
          },
        });
        setIsFavorite(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post(`/api/users/${authedUser.id}/favorites`, {
          listingId: listing.id,
        });
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
        fill={isFavorite ? `currentColor` : "gray"}
        onClick={handleToggleFavorite}
        viewBox="0 0 51 48"
      >
        <title>Five Pointed Star</title>
        <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
      </svg>
    </div>
  );
};

export default FavoriteButton;
