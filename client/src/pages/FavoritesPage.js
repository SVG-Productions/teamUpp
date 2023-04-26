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
      <AuthedPageTitle
        links={[
          { to: `/${authedUser.username}`, label: authedUser.username },
          { label: "Favorites" },
        ]}
      />
      <div className="mt-8 h-full">
        <ScrollableList title="Favorite Listings">
          {favorites.map((listing, index) => (
            <div
              key={index}
              className="flex flex-row bg-white p-2.5 rounded-md"
            >
              <div className="flex flex-row w-2/3 items-center">
                <FavoriteButton listing={listing} />
                <div className="text-xs sm:text-lg font-bold">
                  {listing.companyName}
                </div>
                <div className="hidden sm:block sm:text-lg font-bold mx-2">
                  /
                </div>
                <NavLink
                  className="text-xs sm:text-base px-3 hover:underline sm:px-0"
                  to={`/teams/${listing.teamId}/listings/${listing.id}/details`}
                >
                  {listing.jobTitle}
                </NavLink>
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
      </div>
    </>
  );
};

export const favoritesLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const { favorites } = userResponse.data;

  return { favorites };
};
