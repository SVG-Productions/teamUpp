import { useRouteLoaderData } from "react-router-dom";
import userAvatars from "../utils/userAvatars";

export const UserPhotoSettingsPage = () => {
  const { userData } = useRouteLoaderData("userSettings");
  const { avatar, photo } = userData;

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
  rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="w-full">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Profile photo
        </h1>
        {userAvatars.map((ua) => (
          <img key={ua} src={ua} />
        ))}
      </div>
    </div>
  );
};
