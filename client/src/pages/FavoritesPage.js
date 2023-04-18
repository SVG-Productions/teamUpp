import { NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import DropdownMenuButton from "../components/DropdownMenuButton";
import ScrollableList from "../components/ScrollableList";
import formatDate from "../utils/formatDate";

export const FavoritesPage = () => {
  const { favorites } = useLoaderData();
  const { authedUser } = useAuth();

  return (
    <>
      <AuthedPageTitle>
        <NavLink to={`/${authedUser.username}`} className="hover:underline">
          {authedUser.username}
        </NavLink>{" "}
        / Favorites
      </AuthedPageTitle>
      <ScrollableList
        title="Favorite Listings"
        width="w-full min-w-[325px] -mx-4 sm:mx-0"
        height="h-[40rem] sm:h-[100%] min-h-[430px] mt-8"
      >
        {favorites.map((listing, index) => (
          <div key={index} className="flex flex-row bg-white p-2.5 rounded-md">
            <div className="flex flex-row w-2/3 items-center">
              <FavoriteButton listing={listing} />
              <div className="text-xs sm:text-lg font-bold">
                {listing.companyName}
              </div>
              <div className="hidden sm:block sm:text-lg font-bold mx-2">/</div>
              <div className="text-xs sm:text-base px-3 sm:px-0">
                {listing.jobTitle}
              </div>
            </div>
            <div className="flex flex-row justify-end w-1/3 items-center">
              <div className="text-xs sm:text-sm">
                {formatDate(listing.createdAt)}
              </div>
              <DropdownMenuButton />
            </div>
          </div>
        ))}
      </ScrollableList>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const { username } = params;
  const { data: userId } = await axios.get(`/api/users/usernames/${username}`);
  const favoritesData = await axios.get(`/api/users/${userId}/favorites`);
  const favorites = favoritesData.data;

  return { favorites };
};
