import axios from "axios";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FavoriteButton = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(true);
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
        className="h-6 w-6 cursor-pointer"
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
