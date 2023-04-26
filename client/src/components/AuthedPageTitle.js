import { NavLink } from "react-router-dom";
import React from "react";

const AuthedPageTitle = ({ links }) => {
  return (
    <h1 className="sm:text-2xl text-lg">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {index === links.length - 1 ? (
            <span>{link.label}</span>
          ) : (
            <>
              <NavLink to={link.to} className="hover:underline">
                {link.label}
              </NavLink>{" "}
              /{" "}
            </>
          )}
        </React.Fragment>
      ))}
    </h1>
  );
};

export default AuthedPageTitle;
