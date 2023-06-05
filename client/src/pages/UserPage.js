import axios from "axios";
import UserInfo from "../components/UserInfo";
import UserInterests from "../components/UserInterests";
import UserReadMe from "../components/UserReadMe";
import UserTeamsList from "../components/UserTeamsList";
import UserTeammatesList from "../components/UserTeammatesList";

export const UserPage = () => {
  return (
    <>
      <div
        className="top-32 flex flex-col flex-grow w-full h-full self-center p-6 pb-8 
      sm:flex-row sm:max-w-7xl sm:pb-0"
      >
        <div className="top-16 flex flex-col items-center gap-4 rounded-sm sm:sticky sm:gap-8 sm:w-1/4">
          <UserInfo />
        </div>
        <div className="flex flex-col gap-8 py-4 sm:w-7/12 sm:px-8 sm:pt-8 sm:gap-4 ">
          <UserInterests />
          <UserReadMe />
          <UserTeamsList />
        </div>
        <div className="py-4 sm:w-1/6 sm:px-4 sm:pt-8">
          <UserTeammatesList />
        </div>
      </div>
    </>
  );
};

export const userLoader = async ({ request, params }) => {
  const { username } = params;
  const userResponse = await axios.get(`/api/users/${username}`);
  const userData = userResponse.data;

  return {
    userData,
  };
};
