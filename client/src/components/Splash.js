import { NavLink } from "react-router-dom";

const Splash = () => {
  return (
    <div>
      <h1>SPLASH</h1>
      <div>
        <NavLink to="/login" className="text-blue-700">
          GO TO LOGIN
        </NavLink>
      </div>
      <div>
        <NavLink to="/signup" className="text-blue-700">
          GO TO SIGNUP
        </NavLink>
      </div>
    </div>
  );
};

export default Splash;
