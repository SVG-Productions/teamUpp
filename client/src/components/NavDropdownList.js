import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavDropdownList = () => {
  const { authedUser, logout } = useAuth();

  const handleSignout = async () => {
    await logout();
  };

  return (
    <div className="absolute top-3 -right-3 z-10 flex flex-col bg-slate-100 shadow-md text-center border rounded-sm">
      <NavLink
        to={`/${authedUser?.id}`}
        className="w-36 sm:w-40 hover:bg-blue-200 py-2"
      >
        Profile
      </NavLink>
      <NavLink
        to={`/${authedUser?.id}/settings`}
        className="w-36 sm:w-40 hover:bg-blue-200 py-2"
      >
        Settings
      </NavLink>
      <button
        onClick={handleSignout}
        className="w-36 sm:w-40 hover:bg-blue-200 py-2"
      >
        Sign Out
      </button>
    </div>
  );
};

export default NavDropdownList;
