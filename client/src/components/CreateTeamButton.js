import AddIcon from "./AddIcon";
import CreateTeamModal from "./CreateTeamModal";

const CreateTeamButton = ({ isCreateModalShowing, handleCreateModal }) => {
  return (
    <>
      <div
        className="absolute flex justify-center right-0 top-1 w-8 h-8 text-xl 
     bg-white hover:bg-slate-400 rounded-full cursor-pointer sm:top-1.5"
        onClick={() => handleCreateModal(true)}
      >
        <AddIcon iconSize="16px" fill="black" />
      </div>
      {isCreateModalShowing && (
        <CreateTeamModal handleCreateModal={handleCreateModal} />
      )}
    </>
  );
};

export default CreateTeamButton;
