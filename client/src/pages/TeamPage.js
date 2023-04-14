import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import NullInfo from "../components/NullInfo";
import FavoriteButton from "../components/FavoriteButton";
import DropdownMenuButton from "../components/DropdownMenuButton";
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

const TeamPage = () => {
  const { singleTeamData, teammatesData } = useLoaderData();
  const { id, name, jobField, description } = singleTeamData.data;
  const teammates = teammatesData.data;
  console.log(teammates);

  return (
    <>
      <div className="relative">
        <AuthedPageTitle>Teams / {name}</AuthedPageTitle>
        <div className="absolute right-0 top-1">
          <NavLink
            to={`/teams/${id}/settings`}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 hover:bg-slate-500 ml-2 text-xl font-bold text-white"
          >
            &#9998;
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-10 mt-8 w-full h-[90%]">
        <div className="sm:w-2/3 h-full">
          <ScrollableList
            title="Team Listings"
            height="sm:h-full"
            width="sm:w-full"
            hasAddButton={true}
          >
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
        <div className="flex flex-col gap-8 sm:w-1/3 h-full">
          <div className="flex flex-col max-h-60 sm:max-h-max sm:w-full sm:h-2/3 rounded-sm bg-slate-100 shadow">
            <p className="relative z-10 p-3 font-bold shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)]">
              Team Credo
            </p>
            <div className="h-full p-4 m-1 mt-0 bg-white rounded-sm overflow-auto">
              {description ? description : <NullInfo />}
            </div>
          </div>
          <ScrollableList title="Teammates" height="sm:h-1/3">
            {teammates.map((teammate, index) => (
              <li
                className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
                key={`${teammate.id}-${index}`}
              >
                <div className="bg-white rounded-full w-6 h-6 mr-4" />
                <p> {teammate.username}</p>
              </li>
            ))}
          </ScrollableList>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
