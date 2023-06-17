import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export const LoginPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await login(credential, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Logo />
      <h1 className="text-4xl text-slate-600 mb-10">
        Sign In to <span className="font-semibold">TeamApp</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6">
        <FormField
          label="Username/Email"
          id="email-username"
          type="text"
          placeholder={"Enter username or e-mail"}
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label
              className="block font-bold text-headingColor mb-2 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <a
              className="inline-block no-underline align-baseline text-sm mb-2 text-red-500 hover:text-red-800"
              href="/forgot-password"
            >
              Forgot Password?
            </a>
          </div>
          <input
            className="border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-slate-400"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-700 text-center">{error}</p>}
        <button
          className="w-full bg-blueGray hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <p className="font-bold mb-6">- or -</p>
      <div className="h-11 mb-4">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          type="standard"
          theme="filled_black"
          size="large"
          shape="pill"
          text="signin_with"
          width="320"
        />
      </div>
      <AuthFormRedirect
        text="New to TeamApp?"
        linkText="Create an account!"
        href="/signup"
      />
    </>
  );
};
