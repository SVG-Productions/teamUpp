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
    <div className="flex flex-col relative rounded-sm bg-slate-100 shadow p-6">
      <div className="flex justify-between gap-4">
        <p className="font-semibold text-center">
          Join <span className="font-bold">{team.name}!</span>
        </p>
        <button
          className="py-1 px-2 w-1/4 bg-blue-500 hover:bg-blue-300 rounded-sm text-white text-sm"
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
