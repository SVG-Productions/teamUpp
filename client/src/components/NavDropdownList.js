import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavDropdownList = ({ setIsListShowing }) => {
  const { authedUser, logout } = useAuth();

  const handleSignout = async () => {
    await logout();
  };

  return (
    <div className="absolute top-3 -right-3 z-30 flex flex-col bg-secondary shadow-md text-center border border-t-0 border-borderprimary rounded-sm">
      <NavLink
        onClick={() => setIsListShowing(false)}
        to={`/${authedUser?.username}`}
        className="no-underline text-primary w-28 hover:bg-highlightSecondary py-2"
      >
        Profile
      </NavLink>
      <NavLink
        onClick={() => setIsListShowing(false)}
        to={`/${authedUser?.username}/settings`}
        className="no-underline w-28 text-primary hover:bg-highlightSecondary py-2"
      >
        Settings
      </NavLink>
      <button
        onClick={handleSignout}
        className="w-28 hover:bg-highlightSecondary py-2 text-primary"
      >
        Sign Out
      </button>
    </div>
  );
};

export default NavDropdownList;
