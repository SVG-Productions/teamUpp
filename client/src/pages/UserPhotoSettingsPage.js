import userAvatars from "../utils/userAvatars";
import { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

export const UserPhotoSettingsPage = () => {
  const { setAuthedUser } = useAuth();
  const { userData } = useRouteLoaderData("userSettings");
  const revalidator = useRevalidator();

  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar);
  const [currentPhoto, setCurrentPhoto] = useState(userData.photo);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChangeAvatar = (img) => {
    if (currentPhoto) return;
    setSelectedAvatar(img);
  };

  const handleUploadPhoto = async () => {
    // add photo to bucket storage
    // add returned photo url to database
    // ---- combine above statements into one controller
    // setCurrentPhoto(returnedUrl);
    try {
      if (!selectedFile) {
        toast.error("Please select a file.", basicToast);
        return;
      }

      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await axios.patch("/api/session/user/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCurrentPhoto(response.data.photo);
      setSelectedFile(null);

      setAuthedUser((prev) => ({
        ...prev,
        photo: response.data.photo,
      }));
      revalidator.revalidate();

      toast.success("Photo uploaded successfully!", basicToast);
    } catch (error) {
      toast.error("Oops! Something went wrong.", basicToast);
    }
  };

  const handleRemovePhoto = async () => {
    // delete photo from bucket storage
    // clear out photo from database
    // ---- combine above statements into one controller
    // setCurrentPhoto("");
    try {
      await axios.delete("/api/session/user/photo");

      setCurrentPhoto("");
      setSelectedFile(null);

      setAuthedUser((prev) => ({
        ...prev,
        photo: "",
      }));
      revalidator.revalidate();

      toast.success("Photo removed successfully!", basicToast);
    } catch (error) {
      toast.error("Oops! Something went wrong.", basicToast);
    }
  };

  const handleSubmitAvatar = async () => {
    try {
      await axios.patch("/api/session/user/avatar", { avatar: selectedAvatar });
      setAuthedUser((prev) => ({
        ...prev,
        avatar: selectedAvatar,
      }));
      revalidator.revalidate();
      toast.success("Avatar successfully updated!", basicToast);
    } catch (error) {
      toast.error("Oops! Something went wrong.", basicToast);
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
              onClick={handleRemovePhoto}
            >
              Remove profile picture
            </button>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <button
                className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
          border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
                onClick={() => fileInputRef.current.click()}
              >
                Upload profile picture
              </button>
              <button
                className="no-underline font-semibold text-sm min-w-fit text-primary p-2 bg-secondary rounded-md
border border-slate-400 hover:border-slate-600 hover:bg-highlight sm:text-base"
                disabled={!selectedFile}
                onClick={handleUploadPhoto}
              >
                Confirm upload
              </button>
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
