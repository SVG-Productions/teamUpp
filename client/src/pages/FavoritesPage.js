import { Navigate, useLoaderData } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import AuthedPageTitle from "../components/AuthedPageTitle";
import DropdownMenuButton from "../components/DropdownMenuButton";
import ScrollableList from "../components/ScrollableList";
import formatDate from "../utils/formatDate";
import { useAuth } from "../context/AuthContext";

const FavoritesPage = () => {
  const { userFavorites } = useLoaderData();
  const { favorites } = userFavorites.data;
  const { authedUser } = useAuth();

  if (!authedUser) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <AuthedPageTitle>{authedUser?.username} / Favorites</AuthedPageTitle>
      <ScrollableList
        title="Favorite Listings"
        width="w-full min-w-[325px] -mx-4 sm:mx-0"
        height="h-[40rem] sm:h-[100%] min-h-[430px] mt-8"
      >
        {favorites.map((listing, index) => (
          <div key={index} className="flex flex-row bg-white p-2.5 rounded-md">
            <div className="flex flex-row w-2/3 items-center">
              <FavoriteButton />
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

export default FavoritesPage;
