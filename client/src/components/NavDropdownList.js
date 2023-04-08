import { NavLink } from "react-router-dom";

const NavDropdownList = () => {
  return (
    <div className="absolute top-3 -right-3 z-10 flex flex-col bg-slate-100 shadow-md text-center border rounded-sm">
      <NavLink className="w-36 sm:w-40 hover:bg-blue-200 py-2">Profile</NavLink>
      <NavLink className="w-36 sm:w-40 hover:bg-blue-200 py-2">
        Settings
      </NavLink>
      <NavLink className="w-36 sm:w-40 hover:bg-blue-200 py-2">
        Sign Out
      </NavLink>
    </div>
  );
};

export default NavDropdownList;
