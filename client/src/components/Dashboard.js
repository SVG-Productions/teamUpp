import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ScrollableList from "./ScrollableList";
import AuthedPageTitle from "./AuthedPageTitle";
import AcceptButton from "./AcceptButton";
import DenyButton from "./DenyButton";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  const { userTeams, invites, teammates, recommendedTeams, recentActivity } =
    useLoaderData();
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
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-full min-h-[410px]">
        <div className="flex flex-col sm:w-[75%]">
          <div className="sm:h-[65%]">
            <ScrollableList title="Recent Activity">
              {recentActivity.map((activity, index) => (
                <RecentActivity activity={activity} index={index} />
              ))}
            </ScrollableList>
          </div>
          <div className="flex flex-col sm:flex-row sm:h-[35%] justify-between">
            <div className="sm:w-full md:w-[48%]">
              <ScrollableList title="Notifications">
                {invites.length ? (
                  invites.map((team, index) => (
                    <li
                      className="flex bg-white p-2.5 rounded-md justify-between hover:bg-highlightblue"
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
            <div className="md:flex hidden sm:w-[48%]">
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
        </div>
        <div className="hidden sm:flex flex-col sm:w-[25%] justify-between min-w-[180px]">
          <div className="sm:w-full sm:h-[48%]">
            <ScrollableList title="Your Teams">
              {userTeams.map((team, index) => (
                <NavLink
                  to={`/teams/${team.id}`}
                  className="bg-white p-2.5 rounded-md hover:bg-highlightblue"
                  key={`${team.name}-${index}`}
                >
                  {team.name}
                </NavLink>
              ))}
            </ScrollableList>
          </div>
          <div className="sm:w-full sm:h-[48%]">
            <ScrollableList title="Your Teammates">
              {teammates.map((teammate, index) => (
                <NavLink
                  to={`/${teammate.username}`}
                  className="flex p-2.5 rounded-sm hover:bg-highlightblue"
                  key={`${teammate.id}-${index}`}
                >
                  <div className="bg-white rounded-full w-6 h-6 mr-4" />
                  <p> {teammate.username}</p>
                </NavLink>
              ))}
            </ScrollableList>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
