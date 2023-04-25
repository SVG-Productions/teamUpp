import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import FormField from "../components/FormField";
import AuthFormButton from "../components/AuthFormButton";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";
import DeleteExperienceModal from "../components/DeleteExperienceModal";

export const LoginPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credential, password);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <DeleteExperienceModal isOpen={true} />
      <Logo />
      <h1 className="text-4xl text-slate-600 mb-10">
        Sign In to <span className="font-semibold">TeamApp</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="border-slate-300 w-full max-w-sm mb-10 bg-slate-100 rounded-sm shadow p-6"
      >
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
              className="inline-block align-baseline text-sm mb-2 text-blue-500 hover:text-blue-800"
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
        <AuthFormButton>Sign In</AuthFormButton>
      </form>
      <AuthFormRedirect
        text="New to TeamApp?"
        linkText="Create an account!"
        href="/signup"
      />
    </>
  );
};
