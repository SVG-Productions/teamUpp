import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const RequestToJoinForm = () => {
  const { authedUser } = useAuth();
  const { teamData } = useLoaderData();
  const revalidator = useRevalidator();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      if (teamData.autoAccepts) {
        const response = await axios.post(
          `/api/teams/${teamData.id}/teammates`,
          {
            userId: authedUser.id,
            status: "member",
          }
        );
        toast.success(response.data.message, basicToast);
      } else {
        const response = await axios.post(
          `/api/teams/${teamData.id}/teammates`,
          {
            userId: authedUser.id,
            status: "requested",
          }
        );
        toast.success(response.data.message, basicToast);
      }
      revalidator.revalidate();
    } catch (error) {
      toast.error(error.response.data.message, basicToast);
    }
  };
  return (
    <div className="flex flex-col relative items-center">
      <button
        className="flex w-fit p-2 bg-buttonPrimary hover:bg-buttonSecondary rounded text-white text-sm font-semibold"
        onClick={handleRequest}
      >
        Request to Join
      </button>
    </div>
  );
};

export default RequestToJoinForm;
