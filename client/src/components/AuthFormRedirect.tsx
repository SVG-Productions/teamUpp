import React from "react";
import { NavLink } from "react-router-dom";

const AuthFormRedirect = ({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) => {
  return (
    <div className="w-full max-w-sm mb-20 rounded-sm shadow p-5 text-center">
      <p className="font-semibold text-sm text-slate-600">
        {text}
        <NavLink
          className="no-underline mx-2 inline-block align-baseline font-semibold text-sm text-red-500 hover:text-red-800"
          to={href}
        >
          {linkText}
        </NavLink>
      </p>
    </div>
  );
};

export default AuthFormRedirect;
