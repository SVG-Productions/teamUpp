import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

const DeleteAccountButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="border-2 rounded justify-center self-center text-xs 
      font-bold text-red-500 bg-white border-red-500 hover:bg-red-200 p-2 mt-1 whitespace-nowrap"
        onClick={() => setIsModalOpen(true)}
      >
        Delete Account
      </button>
      {isModalOpen && <DeleteAccountModal handleModal={setIsModalOpen} />}
    </>
  );
};

export default DeleteAccountButton;
