import { NavLink } from "react-router-dom";

const NavDropdownList = () => {
  return (
    <div>
      <NavLink>Profile</NavLink>
      <NavLink>Settings</NavLink>
      <NavLink>Logout</NavLink>
    </div>
  );
};

export default NavDropdownList;
