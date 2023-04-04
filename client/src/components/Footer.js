import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex w-full p-4 h-16 border-t-[1px] items-center justify-between text-center text-sm">
      <div className="text-slate-300">
        Copyright &copy; 2023 SVG Productions
      </div>
      <div className="flex justify-center gap-3">
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
