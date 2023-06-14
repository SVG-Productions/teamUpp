import React, { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import FormField from "../components/FormField";
import ReactQuill from "react-quill";
import { commentModules } from "../utils/quillModules";

const ContactUsPage = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/users/send-feedback", { email, subject, message });
  };

  return (
    <div className="flex flex-col mx-auto p-6 items-center max-w-sm sm:p-0">
      <Logo />
      <h1 className="text-4xl text-center text-slate-600 mb-10">Contact Us</h1>
      <h3 className="text-slate-400 text-center mb-8">
        Let us know if you have any questions or feedback.
      </h3>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mb-10">
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
        <button
          className="w-full bg-blueGray hover:bg-blue-900 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUsPage;
