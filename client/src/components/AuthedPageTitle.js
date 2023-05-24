import { NavLink } from "react-router-dom";
import React from "react";

const AuthedPageTitle = ({ links, children }) => {
  return (
    <div className="sticky top-16 z-20 flex justify-between items-center bg-slate-900 p-4">
      <h1 className="text-white sm:text-2xl text-lg">
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
      {children}
    </div>
  );
};

export default AuthedPageTitle;
