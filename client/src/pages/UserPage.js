import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import NullInfo from "../components/NullInfo";
import { useLoaderData } from "react-router-dom";
import formatJoinDate from "../utils/formatJoinDate";

const UserPage = () => {
  const { userData, userTeamData, userTeammates } = useLoaderData();
  const { user } = userData.data;
  const { date_joined, first_name, github, linkedin, readme, username } = user;

  const { teams } = userTeamData.data;

  const { teammates } = userTeammates.data;

  const date = new Date(date_joined);
  const formattedDate = formatJoinDate(date);

  return (
    <>
      <AuthedPageTitle>username / {username}</AuthedPageTitle>
      <div className="flex flex-col sm:flex-row gap-10 my-8 h-[55%] min-h-[430px]">
        <div className="flex flex-col items-center gap-4 sm:gap-8 p-4 rounded-md sm:w-72 bg-slate-100">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white">
            Profile Pic
          </div>
          <div className="self-start">
            <div className="sm:p-4 py-1 px-4">
              name /{" "}
              {first_name ? (
                <span className="text-sm font-bold ">{first_name}</span>
              ) : (
                <NullInfo />
              )}
            </div>
            <div className="sm:p-4 py-1 px-4">
              joined /{" "}
              <span className="text-sm font-bold">{formattedDate}</span>
            </div>
            <div className="sm:p-4 py-1 px-4">
              linkedIn /{" "}
              {linkedin ? (
                <span className="text-sm font-bold">{linkedin}</span>
              ) : (
                <NullInfo />
              )}
            </div>
            <div className="sm:p-4 py-1 px-4">
              github /{" "}
              {github ? (
                <span className="text-sm font-bold">{github}</span>
              ) : (
                <NullInfo />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:w-3/4 h-80 sm:h-auto rounded-md bg-slate-100">
          <p className="p-4 font-bold">ReadME</p>
          <div className="h-full p-4 m-8 mt-0 bg-white rounded-md overflow-auto">
            {readme ? readme : <NullInfo />}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-1/3 gap-10">
        <ScrollableList title="Teams" width="sm:w-2/3">
          {teams.map((team, index) => (
            <li
              className="bg-white p-2.5 rounded-md"
              key={`${team.name}-${index}`}
            >
              {team.name}
            </li>
          ))}
        </ScrollableList>
        <ScrollableList title="All Teammates" width="sm:w-1/3">
          {teammates.map((teammate, index) => (
            <li
              className="flex items-center mb-2 p-1.5"
              key={`${teammate.id}-${index}`}
            >
              <div className="bg-white rounded-full w-7 h-7 mr-4" />
              <p> {teammate.username}</p>
            </li>
          ))}
        </ScrollableList>
      </div>
    </>
  );
};

export default UserPage;
