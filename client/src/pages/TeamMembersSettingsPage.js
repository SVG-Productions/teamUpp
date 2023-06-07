import InviteTeammateForm from "../components/InviteTeammateForm";

export const TeamMembersSettingsPage = () => {
  return (
    <div
      className="flex flex-col flex-grow self-center w-full
  rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Invite member
        </h1>
        <InviteTeammateForm />
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Manage members
        </h1>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Manage requests
        </h1>
      </div>
    </div>
  );
};
