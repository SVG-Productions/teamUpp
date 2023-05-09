import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavDropdownList = ({ setIsListShowing }) => {
  const { authedUser, logout } = useAuth();

  const handleSignout = async () => {
    await logout();
  };

  return (
    <div className="absolute top-3 -right-3 z-30 flex flex-col bg-slate-100 shadow-md text-center border rounded-sm">
      <NavLink
        onClick={() => setIsListShowing(false)}
        to={`/${authedUser?.username}`}
        className="w-28 hover:bg-blue-200 py-2"
      >
        Profile
      </NavLink>
      <NavLink
        onClick={() => setIsListShowing(false)}
        to={`/${authedUser?.username}/settings`}
        className="w-28 hover:bg-blue-200 py-2"
      >
        Settings
      </NavLink>
      <button onClick={handleSignout} className="w-28 hover:bg-blue-200 py-2">
        Sign Out
      </button>
    </div>
  );
};

export default NavDropdownList;
