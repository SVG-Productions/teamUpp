import React, { useState, FormEvent } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import FormField from "../components/FormField";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.patch("/api/users/forgot-password", {
        email,
      });
      setSuccess(response.data.message);
      setEmail("");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col p-6 items-center max-w-sm sm:p-0">
      <Logo />
      <h1 className="text-4xl text-center text-slate-600 mb-10">
        Forgot Your Password?
      </h1>
      {!success && (
        <>
          <h3 className="text-slate-400 text-center mb-8">
            Please enter the email you signed up with so we can send you a link
            to reset your password.
          </h3>
          <form onSubmit={handleSubmit} className="w-full max-w-sm mb-10">
            <FormField
              label="Email"
              id="email-username"
              type="text"
              placeholder={"Enter email..."}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
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
