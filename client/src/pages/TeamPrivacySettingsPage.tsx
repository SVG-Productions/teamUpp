import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import React from "react";
import { TeamType } from "../../type-definitions";

export const TeamPrivacySettingsPage = () => {
  const { teamData } = useRouteLoaderData("teamSettings") as {
    teamData: TeamType;
  };
  const { jobField, name, isPrivate, autoAccepts } = teamData;
  const revalidator = useRevalidator();

  const handleSubmitPrivacy = async (privacy: boolean) => {
    try {
      // TODO: The update validators across the app require certain
      // fields to be present, even if the field is not being changed.
      // This creates a problem since we need validators to make sure
      // no bad data is sent to the API. Need to think of a different
      // approach for PATCH requests and validations.

      const updates = { isPrivate: privacy, jobField, name };
      const response = await axios.patch(`/api/teams/${teamData.id}`, updates);

      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
  };

  const handleSubmitAutoAccept = async (accepts: boolean) => {
    try {
      const updates = { autoAccepts: accepts, jobField, name };
      const response = await axios.patch(`/api/teams/${teamData.id}`, updates);

      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
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
        <div className="flex justify-between items-center mb-4 p-1">
          <div className="flex flex-col mr-2">
            <p className="font-bold">Change team visibility</p>
            <p>
              This team is currently
              {isPrivate ? " private and cannot " : " public and can "}
              be searched.
            </p>
          </div>
          {isPrivate ? (
            <button
              className="text-sm min-w-fit h-[30px] text-primary px-2 bg-secondary rounded-md
                    border border-slate-400 hover:border-slate-600 hover:bg-highlight"
              onClick={() => handleSubmitPrivacy(false)}
            >
              Make public
            </button>
          ) : (
            <button
              className="text-sm min-w-fit h-[30px] text-primary px-2 bg-secondary rounded-md
                    border border-slate-400 hover:border-slate-600 hover:bg-highlight"
              onClick={() => handleSubmitPrivacy(true)}
            >
              Make private
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mb-4 p-1">
          <div className="flex flex-col mr-2">
            <p className="font-bold">Auto-accept requests</p>
            <p>
              This team currently
              {autoAccepts ? " auto-accepts " : " does not auto-accept "}
              requests to join.
            </p>
            <p className="text-xs text-secondary">
              This only applies to future requests. Current requests will need
              to be accepted.
            </p>
          </div>
          {autoAccepts ? (
            <button
              className="text-sm min-w-fit h-[30px] text-primary px-2 bg-secondary rounded-md
                    border border-slate-400 hover:border-slate-600 hover:bg-highlight"
              onClick={() => handleSubmitAutoAccept(false)}
            >
              Disable auto-accept
            </button>
          ) : (
            <button
              className="text-sm min-w-fit h-[30px] text-primary px-2 bg-secondary rounded-md
                    border border-slate-400 hover:border-slate-600 hover:bg-highlight"
              onClick={() => handleSubmitAutoAccept(true)}
            >
              Enable auto-accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
