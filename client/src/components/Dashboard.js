import AuthedPageTitle from "./AuthedPageTitle";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthedPageContainer from "./AuthedPageContainer";
import ScrollableList from "./ScrollableList";
import { useLoaderData } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import DropdownMenuButton from "./DropdownMenuButton";
import formatDate from "../utils/formatDate";

const Dashboard = () => {
  const { userData, userTeamData, userTeammates } = useLoaderData();
  const { teams } = userTeamData.data;

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

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <AuthedPageContainer>
        <AuthedPageTitle>Dashboard</AuthedPageTitle>
        <div className="flex flex-col sm:flex-row gap-10 mt-8 sm:h-screen min-h-[430px]">
          <div className="flex flex-col sm:w-3/4 gap-2.5">
            <div className="overflow-auto sm:h-full">
              <ScrollableList title="Recent Activity" height="sm:h-full">
                {jobListings.map((listing, index) => (
                  <div
                    key={index}
                    className="flex flex-row bg-white p-2.5 rounded-md"
                  >
                    <div className="flex flex-row w-2/3 items-center">
                      <FavoriteButton />
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
            </div>
            <div className="flex flex-col sm:flex-row mt-5 max-h-[33.33%] min-h-[33.33%] gap-10">
              <ScrollableList title="TBD" width="sm:w-1/2">
                {jobListings.map((listing, index) => (
                  <li
                    className="bg-white p-2.5 rounded-md"
                    key={`${listing.company}-${index}`}
                  >
                    {listing.company}
                  </li>
                ))}
              </ScrollableList>
              <ScrollableList title="Recommended Teams" width="sm:w-1/2">
                {teams.map((team, index) => (
                  <li
                    className="bg-white p-2.5 rounded-md"
                    key={`${team.name}-${index}`}
                  >
                    {team.name}
                  </li>
                ))}
              </ScrollableList>
            </div>
          </div>
          <ScrollableList title="Your Teams" width="sm:w-1/2">
            {teams.map((team, index) => (
              <li
                className="bg-white p-2.5 rounded-md"
                key={`${team.name}-${index}`}
              >
                {team.name}
              </li>
            ))}
          </ScrollableList>
        </div>
      </AuthedPageContainer>
      <Footer />
    </div>
  );
};

export default Dashboard;
