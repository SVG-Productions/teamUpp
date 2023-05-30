import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLoaderData } from "react-router-dom";

const RequestToJoinForm = () => {
  const { authedUser } = useAuth();
  const { teamData } = useLoaderData();

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/teams/${teamData.id}/teammates`, {
        userId: authedUser.id,
        status: "requested",
      });
      setIsSuccess(true);
      setSubmissionMessage("Request sent successfully!");
    } catch (error) {
      setIsSuccess(false);
      setSubmissionMessage("Request or invite already pending.");
    }
  };
  return (
    <div className="flex flex-col relative">
      <div className="flex items-center justify-center">
        <button
          className="p-2 bg-bluegray hover:bg-blue-300 rounded text-white text-sm font-semibold"
          onClick={handleRequest}
        >
          Request to Join
        </button>
      </div>
      {submissionMessage && (
        <p
          className={`absolute -bottom-6 self-center ${
            isSuccess ? "text-emerald-500" : "text-red-500"
          } text-[10px] lg:text-xs font-bold whitespace-nowrap mb-1`}
        >
          {submissionMessage}
        </p>
      )}
    </div>
  );
};

export default RequestToJoinForm;
