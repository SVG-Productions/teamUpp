import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouteLoaderData } from "react-router-dom";
import { basicToast } from "../utils/toastOptions";

const InviteTeammateForm = () => {
  const { teamData } = useRouteLoaderData("teamSettings");
  const [friendRequest, setFriendRequest] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.get(`/api/users/${friendRequest}`);
      try {
        await axios.post(`/api/teams/${teamData.id}/teammates`, {
          userId: userResponse.data.user.id,
          status: "invited",
        });
        toast.success("Invited sent successfully!", basicToast);
      } catch (error) {
        toast.error("User already invited or already a teammate!", basicToast);
      }
    } catch (error) {
      toast.error("Username doesn't exist!", basicToast);
    }
  };
  return (
    <form
      onSubmit={handleInvite}
      className="flex justify-between gap-4 mt-2 pb-6 sm:pb-8 sm:w-1/2"
    >
      <input
        className="border border-borderprimary rounded w-3/4 py-2 px-3 text-primary leading-tight focus:outline-bluegray"
        id="friendRequest"
        type="text"
        value={friendRequest}
        placeholder="Enter username..."
        onChange={(e) => setFriendRequest(e.target.value)}
        required
      />
      <button className="w-1/4 bg-buttonPrimary hover:bg-buttonSecondary rounded text-white text-sm font-semibold">
        Invite
      </button>
    </form>
  );
};

export default InviteTeammateForm;
