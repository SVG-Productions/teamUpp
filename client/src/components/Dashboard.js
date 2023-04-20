import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import ScrollableList from "./ScrollableList";
import AuthedPageTitle from "./AuthedPageTitle";
import FavoriteButton from "./FavoriteButton";
import DropdownMenuButton from "./DropdownMenuButton";
import formatDate from "../utils/formatDate";

const jobListings = [
  {
    company: "Acme Inc",
    title: "Full Stack Engineer",
    date: "2023-04-03",
  },
  {
    company: "TechCorp",
    title: "Senior Software Engineer",
    date: "2023-04-02",
  },
  {
    company: "InnovateX",
    title: "Backend Developer",
    date: "2023-04-01",
  },
  {
    company: "BlueSky Co",
    title: "Frontend Developer",
    date: "2023-03-31",
  },
  {
    company: "BigData Corp",
    title: "Data Engineer",
    date: "2023-03-30",
  },
  {
    company: "CodeCloud",
    title: "Cloud Solutions Architect",
    date: "2023-03-29",
  },
  {
    company: "Rocket Software",
    title: "DevOps Engineer",
    date: "2023-03-28",
  },
  {
    company: "ByteCorp",
    title: "Software Developer",
    date: "2023-03-27",
  },
  {
    company: "GlobalTech",
    title: "Mobile Developer",
    date: "2023-03-26",
  },
  {
    company: "Code4U",
    title: "UI/UX Designer",
    date: "2023-03-25",
  },
  {
    company: "CloudBuilders",
    title: "Cloud Infrastructure Engineer",
    date: "2023-03-24",
  },
  {
    company: "RedDev",
    title: "Software Engineer",
    date: "2023-03-23",
  },
  {
    company: "SaaS Inc",
    title: "Senior Java Developer",
    date: "2023-03-22",
  },
  {
    company: "AI Technologies",
    title: "Machine Learning Engineer",
    date: "2023-03-21",
  },
  {
    company: "GreenTech",
    title: "Frontend Web Developer",
    date: "2023-03-20",
  },
  {
    company: "DataWorks",
    title: "Data Analyst",
    date: "2023-03-19",
  },
  {
    company: "AgileSoft",
    title: "Agile Coach",
    date: "2023-03-18",
  },
  {
    company: "SmartSolutions",
    title: "Technical Lead",
    date: "2023-03-17",
  },
  {
    company: "SecureSoft",
    title: "Security Engineer",
    date: "2023-03-16",
  },
  {
    company: "CodeX",
    title: "Full Stack Developer",
    date: "2023-03-15",
  },
];

const Dashboard = () => {
  const { userTeams, invites, recommendedTeams } = useLoaderData();
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
      <AuthedPageTitle>
        <NavLink to={`/${authedUser.username}`} className="hover:underline">
          {authedUser.username}
        </NavLink>{" "}
        / Dashboard
      </AuthedPageTitle>
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-[55%] min-h-[410px]">
        <ScrollableList
          title="Recent Activity"
          width="sm:w-3/4"
          height="sm:h-full"
        >
          {jobListings.map((listing, index) => (
            <div
              key={index}
              className="flex flex-row bg-white p-2.5 rounded-md"
            >
              <div className="flex flex-row w-2/3 items-center">
                <div className="text-xs sm:text-lg font-bold">
                  {listing.company}
                </div>
                <div className="hidden sm:block sm:text-lg font-bold mx-2">
                  /
                </div>
                <div className="text-xs sm:text-base px-3 sm:px-0">
                  {listing.title}
                </div>
              </div>
              <div className="flex flex-row justify-end w-1/3 items-center">
                <div className="text-xs sm:text-sm">
                  {formatDate(listing.date)}
                </div>
                <DropdownMenuButton />
              </div>
            </div>
          ))}
        </ScrollableList>
        <ScrollableList title="Your Teams" width="sm:w-1/4">
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
      <div className="flex flex-col sm:flex-row h-1/3 gap-10">
        <ScrollableList title="Notifications" width="sm:w-1/2">
          {invites.length ? (
            invites.map((team, index) => (
              <li
                className="flex bg-white p-2.5 rounded-md justify-between"
                key={`${team.name}-${index}`}
              >
                <span>Invite to join {team.name}!</span>
                <div className="flex w-1/3 justify-around">
                  <button
                    className="py-1 px-2 w-2/5 bg-green-400 hover:bg-green-300 rounded-sm text-white text-sm"
                    onClick={() => handleAcceptInvite(team)}
                  >
                    Accept
                  </button>
                  <button
                    className="py-1 px-2 w-2/5 bg-red-400 hover:bg-red-300 rounded-sm text-white text-sm"
                    onClick={() => handleDenyInvite(team)}
                  >
                    Deny
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="p-8">No Notifications</p>
          )}
        </ScrollableList>
        <ScrollableList title="Recommended Teams" width="sm:w-1/2">
          {recommendedTeams.map((team, index) => (
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
    </>
  );
};

export default Dashboard;
