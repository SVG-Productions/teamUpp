import React from "react";
import { motion } from "framer-motion";

const LogoSmall = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full hover:bg-buttonSecondary"
    >
      <p className="text-white text-xs">t / a</p>
    </motion.div>
  );
};

export default LogoSmall;
