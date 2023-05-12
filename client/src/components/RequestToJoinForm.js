import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLoaderData } from "react-router-dom";

const RequestToJoinForm = () => {
  const { authedUser } = useAuth();
  const { team } = useLoaderData();

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/teams/${team.id}/teammates`, {
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
      <div className="flex items-center justify-around">
        <p className="font-semibold text-center">
          Join <span className="font-bold">{team.name}!</span>
        </p>
        <button
          className="h-10 w-1/4 bg-bluegray hover:bg-blue-300 rounded text-white text-sm font-semibold"
          onClick={handleRequest}
        >
          Request
        </button>
      </div>
      {submissionMessage && (
        <p
          className={`absolute bottom-1 ${
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
