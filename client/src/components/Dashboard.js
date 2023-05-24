import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "./AuthedPageTitle";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";
import RecentActivity from "./RecentActivity";
import NullInfo from "../components/NullInfo";
import UserTeamsList from "./UserTeamsList";
import UserTeammatesList from "../components/UserTeammatesList";

const Dashboard = () => {
  const { invites, recentActivity } = useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const handleAcceptInvite = async (team) => {
    await axios.patch(`/api/teams/${team.id}/teammates`, {
      userId: authedUser.id,
      status: "member",
    });
    navigate(0);
  };

  const handleDenyInvite = async (team) => {
    await axios.delete(`/api/teams/${team.id}/teammates`, {
      data: { userId: authedUser.id },
    });
    navigate(0);
  };

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${authedUser.username}`, label: authedUser.username },
          { label: "Dashboard" },
        ]}
      />
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-full min-h-[410px] px-10">
        <div className="flex flex-col sm:w-3/4">
          <div className="">
            <p className="font-bold text-slate-400">NOTIFICATIONS</p>
            {invites.length ? (
              invites.map((team, index) => (
                <li
                  className="flex bg-white p-2.5 rounded-sm justify-between hover:bg-highlightblue"
                  key={`${team.name}-${index}`}
                >
                  <span>Invite to join {team.name}!</span>
                  <div className="flex">
                    <AcceptButton
                      onClick={() => handleAcceptInvite(team)}
                      iconSize="28px"
                    />
                    <DenyButton
                      onClick={() => handleDenyInvite(team)}
                      iconSize="28px"
                    />
                  </div>
                </li>
              ))
            ) : (
              <NullInfo />
            )}
          </div>
          <div className="sm:h-[60%] pt-10">
            <p className="font-bold text-slate-400">RECENT ACTIVITY</p>
            {recentActivity.map((activity, index) => (
              <RecentActivity activity={activity} index={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:w-1/4 gap-8">
          <div>
            <UserTeamsList heading="YOUR TEAMS" />
          </div>
          <div>
            {" "}
            <UserTeammatesList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
