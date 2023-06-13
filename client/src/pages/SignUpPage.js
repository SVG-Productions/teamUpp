import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (confirmPassword !== password) {
      return setError("Passwords do not match");
    }
    try {
      const response = await signup(username, email, password);
      setSuccess(response.message);
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
        {error && <p className="text-red-700">{error}</p>}
        {success && <p className="text-green-700 font-semibold">{success}</p>}
      </form>
      <AuthFormRedirect
        text="Already have an account?"
        linkText="Login!"
        href="/login"
      />
    </>
  );
};
