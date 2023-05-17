const DeleteAccountButton = ({ handleModal }) => {
  return (
    <>
      <button
        className="border-2 rounded justify-center self-center text-xs 
      font-bold text-red-500 bg-white border-red-500 hover:bg-red-200 p-2 mt-1 whitespace-nowrap"
        onClick={() => handleModal(true)}
      >
        Delete Account
      </button>
    </>
  );
};

export default DeleteAccountButton;
