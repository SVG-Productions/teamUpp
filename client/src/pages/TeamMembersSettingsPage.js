import { NavLink, useRouteLoaderData } from "react-router-dom";
import InviteTeammateForm from "../components/InviteTeammateForm";
import NullInfo from "../components/NullInfo";

export const TeamMembersSettingsPage = () => {
  const { teamData } = useRouteLoaderData("teamSettings");

  return (
    <div
      className="flex flex-col flex-grow self-center w-full
  rounded-sm max-w-6xl sm:max-h-full"
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Manage members
        </h1>
        <ul className="grid w-full grid-cols-1 gap-y-1 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.teammates.map((i) => (
            <li key={i.id} className="w-[80%] px-1 hover:bg-highlight">
              <NavLink
                to={`/${i.username}`}
                className="w-full flex self-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
              >
                <img
                  className="rounded-full mr-2"
                  src={i.photo || i.avatar}
                  width={28}
                  height={28}
                  alt={i.username}
                />
                <span className="truncate">{i.username}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Manage requests
        </h1>
        <ul className="grid w-full grid-cols-1 gap-y-1 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.requested.length ? (
            teamData.requested.map((i) => (
              <li key={i.id} className="w-[80%] px-1 hover:bg-highlight">
                <NavLink
                  to={`/${i.username}`}
                  className="w-full flex self-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
                >
                  <img
                    className="rounded-full mr-2"
                    src={i.photo || i.avatar}
                    width={28}
                    height={28}
                    alt={i.username}
                  />
                  <span className="truncate">{i.username}</span>
                </NavLink>
              </li>
            ))
          ) : (
            <NullInfo />
          )}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Manage invites
        </h1>
        <h3 className="text-headingColor">
          Invite a friend to join {teamData.name}!
        </h3>
        <InviteTeammateForm />
        {teamData.invited.length && (
          <div>
            <h3 className="text-headingColor">Invited members:</h3>
            <ul className="grid w-full grid-cols-1 gap-y-1 my-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamData.invited.map((i) => (
                <li key={i.id} className="w-[80%] px-1 hover:bg-highlight">
                  <NavLink
                    to={`/${i.username}`}
                    className="w-full flex self-center gap-1 no-underline text-primary p-2.5 rounded-sm sm:px-1"
                  >
                    <img
                      className="rounded-full mr-2"
                      src={i.photo || i.avatar}
                      width={28}
                      height={28}
                      alt={i.username}
                    />
                    <span className="truncate">{i.username}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
