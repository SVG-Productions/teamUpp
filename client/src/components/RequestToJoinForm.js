import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const RequestToJoinForm = () => {
  const { authedUser } = useAuth();
  const { teamData } = useLoaderData();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      if (teamData.autoAccepts) {
        await axios.post(`/api/teams/${teamData.id}/teammates`, {
          userId: authedUser.id,
          status: "member",
        });
        toast.success("Joined team successfully!", basicToast);
      } else {
        await axios.post(`/api/teams/${teamData.id}/teammates`, {
          userId: authedUser.id,
          status: "requested",
        });
        toast.success("Request sent successfully!", basicToast);
      }
    } catch (error) {
      toast.error("Request or invite already pending.", basicToast);
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
