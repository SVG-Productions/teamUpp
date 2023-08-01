import React from "react";

const Logo = ({
  dimensions,
  textSize = "lg",
}: {
  dimensions: number;
  textSize?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center my-8 border border-slate-300 w-${dimensions} h-${dimensions} bg-slate-900 rounded-full`}
    >
      <p className={`text-white text-${textSize}`}>team / app</p>
    </div>
  );
};

export default Logo;
