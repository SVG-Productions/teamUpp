import AddIcon from "./AddIcon";

const CreateTeamButton = () => {
  return (
    <div
      className="absolute flex justify-center right-0 top-1 w-8 h-8 text-xl 
     bg-white hover:bg-slate-400 text-white rounded-full"
    >
      <AddIcon iconSize="16px" fill="black" />
    </div>
  );
};

export default CreateTeamButton;
