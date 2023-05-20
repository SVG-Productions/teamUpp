import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
        className={`cursor-pointer hover:stroke-2 hover:stroke-bluegray ${
          dimensions || "h-6 w-6"
        }`}
        fill={isFavorite ? `currentColor` : "gray"}
        onClick={handleToggleFavorite}
        viewBox="0 0 51 48"
      >
        <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
      </svg>
    </div>
  );
};

export default FavoriteButton;
