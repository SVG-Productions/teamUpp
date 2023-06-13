import { useState } from "react";
import Logo from "../components/Logo";
import FormField from "../components/FormField";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {};

  return (
    <>
      <Logo />
      <h1 className="text-4xl text-slate-600 mb-10">Forgot Your Password?</h1>
      <h3>
        Please enter the email you signed up with to so <br /> we can send you a
        link to reset your password.
      </h3>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mb-10 p-6">
        <FormField
          label="Email"
          id="email-username"
          type="text"
          placeholder={"Enter username or e-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <button
          className="w-full bg-blueGray hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};
