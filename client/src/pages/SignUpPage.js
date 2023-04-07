import { useState } from "react";
import FormField from "../components/FormField";
import AuthFormButton from "../components/AuthFormButton";
import AuthFormRedirect from "../components/AuthFormRedirect";
import Footer from "../components/Footer";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setError(true);
    }
    const newUserData = {
      username,
      email,
      password,
    };

    await axios.post("/api/users/", newUserData);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="border border-slate-300 w-32 h-32 my-8 bg-slate-100 rounded-full" />
        <h1 className="text-4xl text-slate-600 mb-10">Welcome to TeamApp</h1>
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
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
