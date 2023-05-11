import { useLoaderData } from "react-router-dom";

const DeleteAccountButton = () => {
  const { user } = useLoaderData();

  return (
    <button
      className="border-2 rounded h-[75%] justify-center self-center text-xs 
  font-bold text-red-500 bg-white border-red-500 hover:bg-red-200 p-2 mt-1"
      to={`/${user.username}/settings/delete-account`}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
