import React from "react";
import { Link } from "react-router-dom";

const NavbarUnauthed = () => {
  return (
    <div className="fixed z-10 top-0 bg-white flex items-center justify-between gap-3 w-full h-16 p-2 shadow-sm">
      <Link to="/">
        <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full hover:bg-slate-500">
          <p className="text-white text-xs">t / a</p>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <Link to="/login" className="font-lg font-semibold text-black">
          Login
        </Link>
        <Link
          to="/signup"
          className="font-semibold text-sm min-w-fit py-2 px-4 rounded-md
          border-2 border-blue-400 hover:bg-blue-100 hover:no-underline md:text-base"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NavbarUnauthed;
