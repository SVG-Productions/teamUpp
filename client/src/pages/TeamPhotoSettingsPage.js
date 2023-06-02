import teamAvatars from "../utils/teamAvatars";
import { useState } from "react";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";

export const TeamPhotoSettingsPage = () => {
  const { teamData } = useRouteLoaderData("teamSettings");
  const [selectedAvatar, setSelectedAvatar] = useState(teamData.avatar);
  const [currentPhoto, setCurrentPhoto] = useState(teamData.photo);

  const handleChangeAvatar = (img) => {
    if (currentPhoto) return;
    setSelectedAvatar(img);
  };

  const handleUploadPhoto = () => {
    // add photo to bucket storage
    // add returned photo url to database
    // ---- combine above statements into one controller
    // setCurrentPhoto(returnedUrl);
  };

  const handleRemovePhoto = () => {
    // delete photo from bucket storage
    // clear out photo from database
    // ---- combine above statements into one controller
    // setCurrentPhoto("");
  };

  const handleSubmitAvatar = async () => {
    await axios.patch(`/api/teams/${teamData.id}`, { avatar: selectedAvatar });
  };

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
          rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 border-b border-borderprimary">
          Tema photo
        </h1>
        <div className="flex flex-col gap-4 items-center my-6">
          <img
            src={currentPhoto || selectedAvatar}
            className="rounded-full"
            height={200}
            width={200}
          />
          {currentPhoto ? (
            <button
              className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
            >
              Remove team picture
            </button>
          ) : (
            <button
              className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
            >
              Upload team picture
            </button>
          )}
        </div>
      </div>
      <div className={`flex flex-col gap-4 `}>
        <h1 className="text-headingColor font-semibold pb-2 border-b border-borderprimary">
          Select avatar{" "}
          {currentPhoto && (
            <span className="inline-block font-normal text-slate-500 text-sm">
              (Remove team picture to select avatar)
            </span>
          )}
        </h1>
        <div className="grid w-full justify-items-center grid-cols-3 gap-y-4 my-6 sm:grid-cols-4 lg:grid-cols-6">
          {teamAvatars.map((ta) => (
            <img
              key={ta}
              src={ta}
              className={`rounded-full border-2 ${
                !currentPhoto && "cursor-pointer"
              } ${
                selectedAvatar === ua
                  ? "border-[3px] border-blue-600"
                  : "border-borderprimary"
              }`}
              onClick={() => handleChangeAvatar(ta)}
              disabled={currentPhoto}
              height={100}
              width={100}
            />
          ))}
        </div>
        <button
          className="no-underline font-semibold mt-4 text-sm min-w-fit w-[180px] text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base disabled:bg-slate-500 disabled:border-none"
          disabled={currentPhoto}
          onClick={handleSubmitAvatar}
        >
          Save avatar
        </button>
      </div>
    </div>
  );
};
