import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { ListingType, UserType } from "../../type-definitions";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const FavoriteButton = ({
  listing,
  teamId,
  size,
}: {
  listing: ListingType;
  teamId: string;
  size: SizeProp;
}) => {
  const { userData } = useLoaderData() as { userData: UserType };
  const [isFavorite, setIsFavorite] = useState(
    userData.favorites.listings
      .reduce((acc, fav) => {
        acc.push(fav.id);
        return acc;
      }, [] as string[])
      .includes(listing.id)
  );

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      try {
        await axios.delete(`/api/listings/${listing.id}/favorites`);
        setIsFavorite(false);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        await axios.post(`/api/listings/${listing.id}/favorites`);
        setIsFavorite(true);
      } catch (error: any) {
        toast.error(error.response.data.message);
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
