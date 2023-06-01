import { useRouteLoaderData } from "react-router-dom";
import userAvatars from "../utils/userAvatars";
import { useState } from "react";

export const UserPhotoSettingsPage = () => {
  const { userData } = useRouteLoaderData("userSettings");
  const { avatar, photo } = userData;

  const [currentAvatar, setCurrentAvatar] = useState(avatar);

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
  rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="w-full">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Profile photo
        </h1>
        <div className="flex flex-col gap-4 items-center mb-8">
          <img
            src={photo || avatar}
            className="rounded-full"
            height={200}
            width={200}
          />
          {photo ? (
            <button
              className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
            >
              Remove profile picture
            </button>
          ) : (
            <button
              className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
            >
              Upload profile picture
            </button>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Select avatar
        </h1>
        <div className="grid w-full grid-cols-3 sm:grid-cols-6 gap-y-4">
          {userAvatars.map((ua) => (
            <img
              key={ua}
              src={ua}
              className={`rounded-full border-2 ${
                currentAvatar === ua
                  ? "border-[3px] border-blue-600"
                  : "border-borderprimary"
              }`}
              height={100}
              width={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
