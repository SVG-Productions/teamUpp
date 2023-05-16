import { useState } from "react";
import AddIcon from "./AddIcon";
import CreateTeamModal from "./CreateTeamModal";

const CreateTeamButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="absolute flex justify-center right-0 top-1 w-8 h-8 text-xl 
     bg-white hover:bg-slate-400 text-white rounded-full sm:top-1.5"
      onClick={() => setIsModalOpen(true)}
    >
      <AddIcon iconSize="16px" fill="black" />
      {isModalOpen && <CreateTeamModal handleModal={setIsModalOpen} />}
    </div>
  );
};

export default CreateTeamButton;
