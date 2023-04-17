import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormField from "../components/FormField";
import AuthFormButton from "../components/AuthFormButton";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Logo from "../components/Logo";

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return setError(true);
    }
    signup(username, email, password);
  };

  return (
    <>
      <Logo />
      <h1 className="text-4xl text-slate-600 mb-10">
        Welcome to <span className="font-semibold">TeamApp</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="border-slate-300 w-full max-w-sm mb-10 bg-slate-100 rounded-sm shadow p-6"
      >
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
        <AuthFormButton>Sign Up</AuthFormButton>
        {error && <p className="text-red-700">Passwords do not match</p>}
      </form>
      <AuthFormRedirect
        text="Already have an account?"
        linkText="Login!"
        href="/login"
      />
    </>
  );
};
