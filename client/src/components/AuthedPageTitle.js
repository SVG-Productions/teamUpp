import { NavLink } from "react-router-dom";
import React from "react";

const AuthedPageTitle = ({ links }) => {
  return (
    <div className="sticky top-16 max-h-[40px] z-20 flex justify-between items-center bg-primary p-4 max-w-s">
      <h3 className="text-slate-500 text-base">
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
