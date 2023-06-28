import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex w-full p-2 sm:p-4 h-16 border-t border-borderprimary items-center justify-center sm:justify-between sm:text-center text-xs sm:text-sm">
      <div className="text-slate-500 hidden sm:block">
        Copyright &copy; 2023 SVG Productions
      </div>
      <div className="flex justify-center gap-1 sm:gap-3 text-center">
        <NavLink className="no-underline text-primary" to="#">
          About
        </NavLink>{" "}
        |
        <a
          href="https://github.com/SVG-Productions/teamUpp"
          target="_blank"
          rel="noreferrer"
          className="no-underline text-primary"
        >
          GitHub
        </a>{" "}
        |
        <NavLink className="no-underline text-primary" to="#">
          Terms & Policies
        </NavLink>{" "}
        |
        <NavLink className="no-underline text-primary" to="/contact-us">
          Contact Us
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
