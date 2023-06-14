import React from "react";
import Logo from "../components/Logo";
import FormField from "../components/FormField";
import ReactQuill from "react-quill";
import { commentModules } from "../utils/quillModules";

const ContactUsPage = () => {
  return (
    <div className="flex flex-col mx-auto p-6 items-center max-w-sm sm:p-0">
      <Logo />
      <h1 className="text-4xl text-center text-slate-600 mb-10">Contact Us</h1>
      <h3 className="text-slate-400 text-center mb-8">
        Please enter the email you signed up with so we can send you a link to
        reset your password.
      </h3>
      <form onSubmit={""} className="w-full max-w-sm mb-10">
        <FormField
          label="Email"
          id="email-username"
          type="text"
          placeholder={"Enter email..."}
          value={""}
          onChange={""}
        />
        <ReactQuill
          value={""}
          onChange={""}
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
