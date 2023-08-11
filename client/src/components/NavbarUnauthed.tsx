import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavbarUnauthed = () => {
  return (
    <div className="fixed z-10 top-0 bg-white flex items-center justify-between gap-3 w-full h-16 p-2 shadow-sm">
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full hover:bg-slate-500"
        >
          <p className="text-white text-xs">t / a</p>
        </motion.div>
      </Link>
      <div className="flex gap-3 items-center">
        <Link
          to="/login"
          className="font-lg font-semibold text-black hover:text-slate-500 hover:no-underline"
        >
          <motion.div whileHover={{ scale: 1.1 }}>Login</motion.div>
        </Link>
        <Link
          to="/signup"
          className="min-w-fit rounded-md border-2 border-blue-400 hover:bg-blue-100 hover:no-underline"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="py-2 px-4 font-semibold text-sm md:text-base"
          >
            Sign Up
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarUnauthed;
