import React, { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, googleSignup } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (confirmPassword !== password) {
      return setError("Passwords do not match");
    }
    try {
      const response = await signup(username, email, password);
      setSuccess(response.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await googleSignup(credentialResponse);
      setSuccess(response.message);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Logo dimensions={40} />
      <h1 className="text-4xl text-slate-600 mb-10">
        Welcome to <span className="font-semibold">TeamApp</span>
      </h1>
      {!success && (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-sm p-6">
            <FormField
              label="Email address"
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              label="Username"
              id="username"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormField
              label="Password"
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormField
              label="Confirm password"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <p className="text-sm text-red-700 text-center">{error}</p>
            )}
            <button
              className="w-full bg-blueGray hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="font-bold mb-4">- or -</p>
          <div className="h-11 mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSignUp}
              type="standard"
              theme="filled_black"
              size="large"
              shape="pill"
              text="signup_with"
              width="320px"
            />
          </div>
          <AuthFormRedirect
            text="Already have an account?"
            linkText="Login!"
            href="/login"
          />
        </>
      )}
      {success && (
        <p className="text-green-700 font-semibold text-center">{success}</p>
      )}
    </>
  );
};
