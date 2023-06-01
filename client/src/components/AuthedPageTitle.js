import { NavLink } from "react-router-dom";
import React from "react";

const AuthedPageTitle = ({ links }) => {
  return (
    <div className="flex top-16 z-20 w-full bg-primary p-2">
      <ul className="flex text-slate-500 max-w-7xl w-full gap-1 text-sm sm:mx-auto sm:text-base">
        {links.map((link, index) => (
          <li key={index}>
            {index === links.length - 1 ? (
              <span>{link.label}</span>
            ) : (
              <span className="flex gap-1">
                <NavLink
                  to={link.to}
                  className="text-slate-500 no-underline hover:text-primary hover:underline-offset-1"
                >
                  {link.label}
                </NavLink>
                /
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthedPageTitle;
