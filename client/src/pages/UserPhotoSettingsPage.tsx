import userAvatars from "../utils/userAvatars";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { UserType } from "../../type-definitions";

export const UserPhotoSettingsPage = () => {
  const { setAuthedUser } = useAuth();
  const { userData } = useRouteLoaderData("userSettings") as {
    userData: UserType;
  };
  const revalidator = useRevalidator();

  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar);
  const [currentPhoto, setCurrentPhoto] = useState(userData.photo);
  const [uploading, setUploading] = useState(false);

  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  const handleChangeAvatar = (img: string) => {
    if (currentPhoto) return;
    setSelectedAvatar(img);
  };

  const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      if (!file) {
        toast.error("Please select a file.", basicToast);
        return;
      }

      if (file.size > 1000000) {
        toast.error("File size must be less than 1MB.", basicToast);
        return;
      }

      if (!validFileTypes.find((type) => type === file.type)) {
        toast.error("File type must be .jpg, .jpeg, or .png.", basicToast);
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append("photo", file);

      const response = await axios.patch("/api/users/user/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCurrentPhoto(response.data.photo);

      setAuthedUser((prev) => ({
        ...prev,
        photo: response.data.photo,
      }));
      revalidator.revalidate();

      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setUploading(true);
      const response = await axios.delete("/api/users/user/photo");

      setCurrentPhoto("");

      setAuthedUser((prev) => ({
        ...prev,
        photo: "",
      }));
      revalidator.revalidate();

      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitAvatar = async () => {
    try {
      const response = await axios.patch("/api/users/user/avatar", {
        avatar: selectedAvatar,
      });
      setAuthedUser((prev) => ({
        ...prev,
        avatar: selectedAvatar,
      }));
      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
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
            alt={userData.username}
            className="rounded-full w-48 h-48"
            height={192}
            width={192}
          />
          {currentPhoto ? (
            <button
              className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
              onClick={handleRemovePhoto}
              disabled={uploading}
            >
              Remove profile picture
            </button>
          ) : (
            <>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadPhoto}
                disabled={uploading}
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
              >
                {uploading ? "Uploading..." : "Upload profile picture"}
              </label>
            </>
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
              alt={userData.username}
              className={`rounded-full border-2 ${
                !currentPhoto && "cursor-pointer"
              } ${
                selectedAvatar === ua
                  ? "border-[3px] border-blue-600"
                  : "border-borderprimary"
              }`}
              onClick={() => handleChangeAvatar(ua)}
              height={100}
              width={100}
            />
          ))}
        </div>
        <button
          className="no-underline font-semibold mt-4 text-sm min-w-fit w-[180px] text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base disabled:bg-slate-500 disabled:border-none"
          disabled={currentPhoto ? true : false}
          onClick={handleSubmitAvatar}
        >
          Save avatar
        </button>
      </div>
    </div>
  );
};
