import { NavLink } from "react-router-dom";

const NavDropdownList = () => {
  return (
    <div className="absolute top-0 right-0 z-10 flex flex-col gap-3 py-6 bg-slate-100 shadow-md text-center">
      <NavLink className="w-full hover:bg-blue-200">Profile</NavLink>
      <NavLink className="w-full">Settings</NavLink>
      <NavLink className="w-full">Logout</NavLink>
    </div>
  );
};

export default NavDropdownList;
