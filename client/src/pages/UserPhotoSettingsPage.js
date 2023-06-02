import userAvatars from "../utils/userAvatars";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import toast from "react-hot-toast";

export const UserPhotoSettingsPage = () => {
  const { setAuthedUser } = useAuth();
  const { userData } = useRouteLoaderData("userSettings");
  const revalidator = useRevalidator();

  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar);
  const [currentPhoto, setCurrentPhoto] = useState(userData.photo);

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
    try {
      await axios.patch("/api/session/user/avatar", { avatar: selectedAvatar });
      setAuthedUser((prev) => ({
        ...prev,
        avatar: selectedAvatar,
      }));
      revalidator.revalidate();
      toast.success("Avatar successfully updated!", {
        position: "bottom-left",
        className: "border border-borderprimary bg-primary text-primary",
      });
    } catch (error) {
      toast.error("Oops! Something went wrong.", {
        position: "bottom-left",
        className: "border border-borderprimary bg-primary text-primary",
      });
    }
  };

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
  rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 border-b border-borderprimary">
          Profile photo
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
      <div className={`flex flex-col gap-4 `}>
        <h1 className="text-headingColor font-semibold pb-2 border-b border-borderprimary">
          Select avatar{" "}
          {currentPhoto && (
            <span className="inline-block font-normal text-slate-500 text-sm">
              (Remove profile picture to select avatar)
            </span>
          )}
        </h1>
        <div className="grid w-full justify-items-center grid-cols-3 gap-y-4 my-6 sm:grid-cols-4 lg:grid-cols-6">
          {userAvatars.map((ua) => (
            <img
              key={ua}
              src={ua}
              className={`rounded-full border-2 ${
                !currentPhoto && "cursor-pointer"
              } ${
                selectedAvatar === ua
                  ? "border-[3px] border-blue-600"
                  : "border-borderprimary"
              }`}
              onClick={() => handleChangeAvatar(ua)}
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
