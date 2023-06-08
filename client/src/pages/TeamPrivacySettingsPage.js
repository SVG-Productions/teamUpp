import { useState } from "react";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

export const TeamPrivacySettingsPage = () => {
  const { teamData } = useRouteLoaderData("teamSettings");

  const [isPrivate, setIsPrivate] = useState(teamData.isPrivate);

  const revalidator = useRevalidator();

  const handleSubmit = async (e) => {
    try {
      const updates = { isPrivate };
      await axios.patch(`/api/teams/${teamData.id}`, updates);

      revalidator.revalidate();
      toast.success("Team successfully updated!", basicToast);
    } catch (error) {
      toast.error("Oops! Something went wrong.", basicToast);
    }
  };

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
      rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="w-full">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Privacy
        </h1>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <p className="font-bold">Change team visibility</p>
            <p>
              This team is currently{" "}
              {isPrivate
                ? "private and cannot be searched"
                : "public and can be searched"}
              .
            </p>
          </div>
          {isPrivate ? (
            <button>Make public</button>
          ) : (
            <button>Make private</button>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="font-bold">Change team visibility</p>
            <p>This team is currently {isPrivate ? "private" : "public"}.</p>
          </div>
          {isPrivate ? (
            <button>Make public</button>
          ) : (
            <button>Make private</button>
          )}
        </div>
      </div>
    </div>
  );
};
