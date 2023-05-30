import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "./AuthedPageTitle";
import RecentActivity from "./RecentActivity";
import NullInfo from "../components/NullInfo";
import UserTeamsList from "./UserTeamsList";
import UserTeammatesList from "../components/UserTeammatesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { userData } = useLoaderData();
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
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:gap-10 sm:px-12 sm:pt-8">
        <div className="flex flex-col gap-4 sm:w-3/4">
          <div className="lg:w-4/5">
            <p className="font-bold text-slate-400">NOTIFICATIONS</p>
            {userData.invites.length ? (
              userData.invites.map((team, index) => (
                <li
                  className="flex bg-white p-2.5 rounded-sm justify-between hover:bg-highlightblue"
                  key={`${team.name}-${index}`}
                >
                  <span className="font-semibold">
                    Invite to join {team.name}!
                  </span>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      size="xl"
                      className="text-slate-900 hover:text-green-500"
                      onClick={() => handleAcceptInvite(team)}
                    />
                    <FontAwesomeIcon
                      icon={faXmarkSquare}
                      size="xl"
                      className="text-slate-900 hover:text-red-500"
                      onClick={() => handleDenyInvite(team)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="px-2">
                <NullInfo />
              </div>
            )}
          </div>
          <div className="lg:w-4/5">
            <p className="font-bold text-slate-400">RECENT ACTIVITY</p>
            {userData.recentActivity.map((activity, index) => (
              <RecentActivity
                activity={activity}
                key={`${index}+${activity.username}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:w-1/4 gap-8">
          <div>
            <UserTeamsList heading="YOUR TEAMS" />
          </div>
          <div>
            <UserTeammatesList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
