import React from "react";
import { NavLink } from "react-router-dom";

const AuthFormRedirect = ({ text, linkText, href }) => {
  return (
    <div className="border-slate-300 w-full max-w-sm bg-slate-100 mb-20 rounded-sm shadow p-5 text-center">
      <p className="font-semibold text-sm text-slate-600">
        {text}
        <NavLink
          className="mx-2 inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
          to={href}
        >
          {linkText}
        </NavLink>
      </p>
    </div>
  );
};

export default AuthFormRedirect;
