import React from "react";

const NullInfo = ({ message = "null" }) => {
  return <span className=" text-slate-400 font-thin">{message}</span>;
};

export default NullInfo;
