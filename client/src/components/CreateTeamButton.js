import { NavLink } from "react-router-dom";
import AddIcon from "./AddIcon";

const CreateTeamButton = () => {
  return (
    <NavLink
      className="absolute flex items-center justify-center right-0 top-0 w-10 h-10 text-xl text-center bg-slate-900 hover:bg-slate-400 font-semibold text-white rounded-full"
      to="/teams/create-team"
    >
      <AddIcon iconSize="14px" />
    </NavLink>
  );
};

export default CreateTeamButton;
