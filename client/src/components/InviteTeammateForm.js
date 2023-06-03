import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { basicToast } from "../utils/toastOptions";

const InviteTeammateForm = () => {
  const { teamData } = useLoaderData();
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
      className="relative rounded-sm p-2 pt-0 pb-6 sm:pb-8"
    >
      <label
        htmlFor="friendRequest"
        className="font-semibold text-headingColor"
      >
        Invite a friend to join{" "}
        <span className="font-bold">{teamData.name}!</span>
      </label>
      <div className="flex justify-between gap-4 mt-4">
        <input
          className="w-3/4 rounded-sm text-sm p-2 border-2"
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
      </div>
    </form>
  );
};

export default InviteTeammateForm;
