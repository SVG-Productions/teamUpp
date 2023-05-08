import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex w-full p-2 sm:p-4 h-16 border-t-[1px] items-center justify-center sm:justify-between sm:text-center text-xs sm:text-sm bg-slate-100">
      <div className="text-slate-300 hidden sm:block">
        Copyright &copy; 2023 SVG Productions
      </div>
      <div className="flex justify-center gap-1 sm:gap-3 text-center">
        <NavLink to="#">About</NavLink> |
        <a
          href="https://github.com/SVG-Productions/teamUpp"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        |<NavLink to="#">Terms & Policies</NavLink> |
        <NavLink to="#">Contact Us</NavLink>
      </div>
    </div>
  );
};

export default Footer;
