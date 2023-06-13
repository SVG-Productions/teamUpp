import axios from "axios";
import { NavLink } from "react-router-dom";

export const ConfirmAccountPage = () => {
  return (
    <div>
      <h1>Account Confirmed.</h1>
      <NavLink to="/login">Go to login</NavLink>
    </div>
  );
};

export const confirmAccountLoader = async ({ request, params }) => {
  const { confirmationCode } = params;

  return axios.patch(`/api/session/confirm/${confirmationCode}`);
};
