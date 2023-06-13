import axios from "axios";
import { NavLink } from "react-router-dom";
import LogoSmall from "../components/LogoSmall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export const ConfirmAccountPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <LogoSmall />
        <span className="ml-2 font-semibold text-2xl">TeamApp</span>
      </div>
      <div className="flex flex-col h-[300px] bg-primary items-center justify-evenly gap-10 font-normal rounded-md sm:w-[500px] sm:bg-secondary sm:shadow-[0_1px_3px_rgb(0,0,0,0.4)]">
        <div className="flex flex-col gap-5">
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="3x"
            color="#2ecc71"
            className="fa-light"
          />
          <h1 className="text-lg sm:text-3xl">Your account is now confirmed</h1>
        </div>
        <div>
          <NavLink
            to="/login"
            className="hover:no-underline text-sm text-center bg-[#2ecc71] hover:bg-[#56fd9c] border-2
            text-white font-bold py-4 px-5 rounded-md focus:shadow-outline sm:text-base"
          >
            Login to get started
          </NavLink>
        </div>
      </div>
    </>
  );
};

export const confirmAccountLoader = async ({ request, params }) => {
  const { confirmationCode } = params;

  return axios.patch(`/api/session/confirm/${confirmationCode}`);
};
