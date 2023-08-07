import React, { FormEvent, FormEventHandler, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logo from "../components/Logo";
import FormField from "../components/FormField";
import ReactQuill from "react-quill";
import { commentModules } from "../utils/quillModules";
import SwitchLayout from "../layouts/SwitchLayout";
import { useAuth } from "../context/AuthContext";

const ContactUsPage = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { authedUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/users/send-feedback", {
        email,
        subject,
        message,
      });
      setSuccess(response.data.message);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <SwitchLayout>
      <div className="flex flex-col items-center p-6 pt-0 sm:p-0">
        <Logo dimensions={40} />
        <h1 className="text-4xl text-center text-slate-600 mb-4">Contact Us</h1>
        {!success && (
          <>
            {" "}
            <h3 className="text-slate-400 text-center mb-4">
              Let us know if you have any questions or feedback.
            </h3>
            <form onSubmit={handleSubmit} className="w-full max-w-sm mb-8">
              <FormField
                label="Email"
                id="email"
                type="email"
                placeholder={"Enter your email..."}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormField
                label="Subject"
                id="subject"
                type="text"
                placeholder={"Enter Subject..."}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label className="block text-sm font-bold mb-2 text-headingColor">
                Message
              </label>
              <ReactQuill
                id="message"
                value={message}
                onChange={setMessage}
                modules={commentModules}
                theme="snow"
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
            <h3 className="text-green-600 font-semibold text-center mb-4">
              {success}
            </h3>
            {!authedUser && (
              <NavLink
                to="/"
                className="font-semibold text-sm min-w-fit text-primary p-2 bg-primary rounded-md
          border border-slate-400 hover:border-slate-600 hover:no-underline hover:bg-secondary sm:text-base"
              >
                Go to login
              </NavLink>
            )}
          </>
        )}
      </div>
    </SwitchLayout>
  );
};

export default ContactUsPage;
