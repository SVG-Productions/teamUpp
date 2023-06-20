import React, { useState } from "react";
import FormField from "../components/FormField";
import { useRouteLoaderData } from "react-router-dom";
import DeleteAccountModal from "../components/DeleteAccountModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

export const UserAccountSettingsPage = () => {
  const { userData } = useRouteLoaderData("userSettings");
  const ownedTeams = userData.teams.filter((t) => t.status === "owner");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.patch("/api/session/password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(response.data.message, basicToast);
    } catch (error) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  return (
    <div
      className={`${
        showDeleteModal && "max-h-[calc(100vh-12rem)] overflow-hidden"
      }`}
    >
      {showDeleteModal && (
        <DeleteAccountModal handleModal={setShowDeleteModal} />
      )}
      {userData.authType === "email" && (
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col flex-grow self-center w-full 
      rounded-sm max-w-6xl mb-12 sm:max-h-full"
        >
          <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
            Change password
          </h1>
          <div className="flex flex-col sm:w-1/2 sm:min-w-[400px]">
            <FormField
              label="Old password"
              id="oldPassword"
              placeholder=" "
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <FormField
              label="New password"
              id="newPassword"
              placeholder=" "
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormField
              label="Confirm new password"
              id="confirmPassword"
              placeholder=" "
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="text-xs">
            Make sure new password is at least 6 characters in length.
          </p>
          <button
            className="w-[140px] font-semibold text-sm mt-2 p-2 bg-secondary rounded-md text-primary
          border border-slate-400 hover:border-slate-600 hover:bg-highlight"
          >
            Update password
          </button>
        </form>
      )}
      <div>
        <h1 className="text-red-400 font-semibold pb-2 mb-4 border-b border-borderprimary">
          Delete account
        </h1>
        <p className="text-sm">
          Warning. This action is irreversible. Teams, listings and experiences
          you own will be deleted.
        </p>
        {ownedTeams.length > 0 && (
          <p className="text-sm">
            Your account is currently an owner of these teams:
            {ownedTeams.map((t, index) => {
              if (index === ownedTeams.length - 1) {
                return (
                  <span key={t.id} className="font-semibold ml-1">
                    {`and ${t.name}.`}
                  </span>
                );
              } else {
                return (
                  <span key={t.id} className="font-semibold ml-1">
                    {`${t.name},`}
                  </span>
                );
              }
            })}
          </p>
        )}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-[160px] font-semibold text-sm mt-2 p-2 rounded-md bg-secondary text-red-400
          border border-slate-400 hover:border-slate-600 hover:bg-highlight"
        >
          Delete your account
        </button>
      </div>
    </div>
  );
};
