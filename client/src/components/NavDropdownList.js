import { NavLink } from "react-router-dom";

const NavDropdownList = () => {
  return (
    <div className="absolute right-0 -bottom-10">
      <NavLink>Profile</NavLink>
      <NavLink>Settings</NavLink>
      <NavLink>Logout</NavLink>
    </div>
  );
};

export default NavDropdownList;
