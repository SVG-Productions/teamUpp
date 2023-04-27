import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ScrollableList from "./ScrollableList";
import AuthedPageTitle from "./AuthedPageTitle";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  const { userTeams, invites, recommendedTeams, recentActivity } =
    useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  console.log(recentActivity);

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
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-[55%] min-h-[410px]">
        <div className="sm:w-3/4 sm:h-full h-60">
          <ScrollableList title="Recent Activity">
            {recentActivity.map((activity, index) => (
              <RecentActivity activity={activity} index={index} />
            ))}
          </ScrollableList>
        </div>
        <div className="sm:w-1/4 sm:h-full h-60">
          <ScrollableList title="Your Teams">
            {userTeams.map((team, index) => (
              <NavLink
                to={`/teams/${team.id}`}
                className="bg-white p-2.5 rounded-md hover:bg-blue-200"
                key={`${team.name}-${index}`}
              >
                {team.name}
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-1/3 gap-10">
        <div className="sm:w-1/2 sm:h-full h-60">
          <ScrollableList title="Notifications">
            {invites.length ? (
              invites.map((team, index) => (
                <li
                  className="flex bg-white p-2.5 rounded-md justify-between"
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
              <p className="p-8">No Notifications</p>
            )}
          </ScrollableList>
        </div>
        <div className="sm:w-1/2 sm:h-full h-60">
          <ScrollableList title="Recommended Teams">
            {recommendedTeams.map((team, index) => (
              <NavLink
                to={`/teams/${team.id}`}
                className="bg-white p-2.5 rounded-md hover:bg-blue-200"
                key={`${team.name}-${index}`}
              >
                <div className="flex gap-1">
                  <p className="font-semibold">{team.name} /</p>
                  <p className="text-gray-400">{team.jobField}</p>
                </div>
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
