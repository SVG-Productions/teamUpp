import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const InviteTeammateForm = () => {
  const { team } = useLoaderData();

  const [friendRequest, setFriendRequest] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.get(`/api/users/${friendRequest}`);
      try {
        await axios.post(`/api/teams/${team.id}/teammates`, {
          userId: userResponse.data.user.id,
          status: "invited",
        });
        setIsSuccess(true);
        setSubmissionMessage("Invite sent successfully!");
      } catch (error) {
        setIsSuccess(false);
        setSubmissionMessage("User already a teammate or invited!");
      }
    } catch (error) {
      setIsSuccess(false);
      setSubmissionMessage("Username doesn't exist!");
    }
  };
  return (
    <form
      onSubmit={handleInvite}
      className="relative rounded-sm p-4 pt-0 sm:pt-8 sm:pr-12"
    >
      <label htmlFor="friendRequest" className="font-semibold">
        Invite a friend to join <span className="font-bold">{team.name}!</span>
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
        <button className="w-1/4 bg-bluegray hover:bg-blue-300 rounded text-white text-sm font-semibold">
          Invite
        </button>
      </div>
      {submissionMessage && (
        <p
          className={`absolute bottom-1 ${
            isSuccess ? "text-emerald-500" : "text-red-500"
          } text-[10px] lg:text-xs font-bold pl-1 whitespace-nowrap`}
        >
          {submissionMessage}
        </p>
      )}
    </form>
  );
};

export default InviteTeammateForm;
