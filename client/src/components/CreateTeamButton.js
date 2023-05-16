import AddIcon from "./AddIcon";

const CreateTeamButton = ({ onClick }) => {
  return (
    <div
      className="absolute flex justify-center right-0 top-1 w-8 h-8 text-xl 
     bg-white hover:bg-slate-400 text-white rounded-full sm:top-1.5"
      onClick={onClick}
    >
      <AddIcon iconSize="16px" fill="black" />
    </div>
  );
};

export default CreateTeamButton;
