import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";
import useFetch from "../hooks/useFetch";

/*
 * STEP 2 - Hooks and SignUp/Login useEffect
 * A - Create basic fetch and mutation hooks, useFetch and useMutation
 * B - Add useEffect to check for availability of google's script(index.html)
 * C - We use the `initialize` method available in the script to handle functionality of the authentication button
 * E - Add div at the end of the form in preparation for the google button
 * F - Create new .env file for the client and create REACT_APP_GOOGLE_CLIENT_ID variable
 * D - Do the same for LoginPage
 */

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signup } = useAuth();

  const { handleGoogle, loading } = useFetch("/api/session/google/signup");

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  const handleSubmit = async (e) => {
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Logo />
      <h1 className="text-4xl text-slate-600 mb-10">
        Welcome to <span className="font-semibold">TeamApp</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mb-10 p-6">
        {!success && (
          <>
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
            <button
              className="w-full bg-blueGray hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </>
        )}
        {error && <p className="text-red-700">{error}</p>}
        {success && (
          <p className="text-green-700 font-semibold text-center">{success}</p>
        )}
      </form>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div id="signUpDiv" data-text="signup_with"></div>
      )}
      <AuthFormRedirect
        text="Already have an account?"
        linkText="Login!"
        href="/login"
      />
    </>
  );
};
