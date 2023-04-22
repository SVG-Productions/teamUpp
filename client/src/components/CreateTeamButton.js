import { NavLink } from "react-router-dom";

const CreateTeamButton = () => {
  return (
    <NavLink
      className="absolute flex justify-center right-0 top-0 w-10 h-10 text-4xl text-center bg-emerald-400 hover:bg-emerald-700 font-semibold text-white rounded-full leading-8 "
      to="/teams/create-team"
    >
      +
    </NavLink>
  );
};

export default CreateTeamButton;
