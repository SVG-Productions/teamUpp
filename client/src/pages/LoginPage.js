import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await login(credential, password);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Logo />
      <h1 className="text-4xl text-slate-600 mb-10">
        Sign In to <span className="font-semibold">TeamApp</span>
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mb-10 p-6">
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
              className="block font-semibold text-slate-600 mb-2 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <a
              className="inline-block no-underline align-baseline text-sm mb-2 text-red-500 hover:text-red-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 text-center">
            Invalid credentials or password.
          </p>
        )}
        <button
          className="w-full bg-bluegray hover:bg-slate-400 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <AuthFormRedirect
        text="New to TeamApp?"
        linkText="Create an account!"
        href="/signup"
      />
    </>
  );
};
