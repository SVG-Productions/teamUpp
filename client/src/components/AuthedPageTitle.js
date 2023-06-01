import { NavLink } from "react-router-dom";
import React from "react";

const AuthedPageTitle = ({ links }) => {
  return (
    <div className="top-16 z-20 flex max-w-7xl self-center w-full justify-between items-center bg-primary p-4 sm:py-2">
      <h3 className="text-slate-500 text-sm sm:text-base">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {index === links.length - 1 ? (
              <span>{link.label}</span>
            ) : (
              <>
                <NavLink
                  to={link.to}
                  className="text-slate-500 hover:text-primary underline-offset-2"
                >
                  {link.label}
                </NavLink>{" "}
                /{" "}
              </>
            )}
          </React.Fragment>
        ))}
      </h3>
    </div>
  );
};

export default AuthedPageTitle;
