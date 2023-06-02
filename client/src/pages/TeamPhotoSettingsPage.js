import userAvatars from "../utils/userAvatars";
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
      <div className="w-full">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Team photo -- Coming soon!
        </h1>
      </div>
    </div>
  );
};
