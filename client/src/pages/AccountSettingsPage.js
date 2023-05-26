import React, { useState } from "react";
import FormField from "../components/FormField";
import { useRouteLoaderData } from "react-router-dom";
import DeleteAccountModal from "../components/DeleteAccountModal";

export const AccountSettingsPage = () => {
  const { ownedTeams } = useRouteLoaderData("userSettings");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChangePassword = () => {};

  return (
    <div
      className={`${
        showDeleteModal && "max-h-[calc(100vh-12rem)] overflow-hidden"
      }`}
    >
      {showDeleteModal && (
        <DeleteAccountModal handleModal={setShowDeleteModal} />
      )}
      <form
        onSubmit={handleChangePassword}
        className="flex flex-col flex-grow self-center w-full 
      rounded-sm max-w-6xl sm:max-h-full"
      >
        <h1 className="text-slate-400 font-semibold pb-2 mb-4 border-b border-slate-300">
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
        <p className="text-xs">Make sure password is at least 6 characters.</p>
        <button
          className="w-[140px] font-semibold text-sm mt-1 px-2 rounded-md text-slate-600
          border-2 border-slate-400 hover:border-slate-600 hover:bg-slate-200"
        >
          Update password
        </button>
      </form>
      <div className="mt-12">
        <h1 className="text-red-400 font-semibold pb-2 mb-4 border-b border-slate-300">
          Delete account
        </h1>
        <p className="text-sm">
          Warning. This action is irreversible. Teams, listings and experiences
          you own will be deleted.
        </p>
        {ownedTeams.length && (
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
          className="w-[160px] font-semibold text-sm mt-2 px-2 rounded-md text-red-400
          border-2 border-slate-400 hover:border-slate-600 hover:bg-slate-200"
        >
          Delete your account
        </button>
      </div>
    </div>
  );
};
