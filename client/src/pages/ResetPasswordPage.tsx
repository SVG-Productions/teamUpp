import axios from "axios";
import React, { FormEvent, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import FormField from "../components/FormField";
import Logo from "../components/Logo";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<{
    message: string;
    isExpired: boolean;
  } | null>(null);
  const [success, setSuccess] = useState("");

  const { resetPassword } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.patch(
        `/api/users/reset-password/${resetPassword}`,
        { newPassword, confirmNewPassword }
      );
      setSuccess(response.data.message);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex flex-col p-6 items-center max-w-sm sm:p-0">
      <Logo dimensions={40} />
      <h1 className="text-4xl text-center text-slate-600 mb-10">
        Reset Your Password
      </h1>
      {!success && (
        <>
          <h3 className="text-slate-400 text-center mb-8">
            Please enter and confirm your new password.
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full max-w-sm mb-10"
          >
            <FormField
              label="New Password"
              id="new-password"
              type="password"
              placeholder={"Enter new password..."}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormField
              label="Confirm New Password"
              id="confirm-new-password"
              type="password"
              placeholder={"Confirm new password..."}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {error && (
              <>
                <p className="text-sm text-red-600 text-center">
                  {error.message}
                </p>
                {error.isExpired && (
                  <NavLink className="text-sm" to="/forgot-password">
                    Re-submit forgot password form
                  </NavLink>
                )}
              </>
            )}
            <button
              className="w-full bg-blueGray hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}
      {success && (
        <>
          <h3 className="text-green-700 font-semibold text-center mb-4">
            {success}
          </h3>
          <NavLink
            to="/login"
            className="font-semibold text-sm min-w-fit text-primary p-2 bg-primary rounded-md
          border border-slate-400 hover:border-slate-600 hover:no-underline hover:bg-secondary sm:text-base"
          >
            Go to login
          </NavLink>
        </>
      )}
    </div>
  );
};
