import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return <div className="flex flex-col h-16 border-t-2 justify-center text-center">
    <div className='flex justify-center gap-3'>
      <NavLink to='#'>About</NavLink> |
      <a href="https://github.com/SVG-Productions/teamUpp" target="_blank" rel="noreferrer">GitHub</a> |
      <NavLink to='#'>Terms & Policies</NavLink> |
      <NavLink to='#'>Contact Us</NavLink>
    </div>
    <div>
      Copyright &copy; 2023 SVG Productions
    </div>
  </div>;
};

export default Footer;
