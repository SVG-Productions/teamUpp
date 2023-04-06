import React from "react";

const AuthFormRedirect = ({ text, linkText, href }) => {
  return (
    <div className="border-2 border-slate-300 w-full max-w-sm bg-slate-100 mb-20 rounded-lg shadow-lg p-5 text-center">
      <p className="font-semibold text-sm text-slate-600">
        {text}
        <a
          className="mx-2 inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
          href={href}
        >
          {linkText}
        </a>
      </p>
    </div>
  );
};

export default AuthFormRedirect;
