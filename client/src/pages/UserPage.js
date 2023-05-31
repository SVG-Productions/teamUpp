import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import UserInterests from "../components/UserInterests";
import UserReadMe from "../components/UserReadMe";
import UserTeamsList from "../components/UserTeamsList";
import UserTeammatesList from "../components/UserTeammatesList";
import { useAuth } from "../context/AuthContext";

export const UserPage = () => {
  const { userData } = useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { username, photo, avatar } = userData;
  const isSessionedUserPage = authedUser.username === username;

  return (
    <>
      <div className="top-32 flex flex-col flex-grow w-full h-full sm:flex-row">
        <div
          className="top-16 flex flex-col items-center gap-4 p-4 rounded-sm 
        sm:sticky sm:gap-8 sm:w-1/4 sm:bg-secondary"
        >
          <UserInfo />
        </div>
        <div className="flex flex-col gap-8 sm:gap-4 px-8 py-4 sm:w-1/2 sm:pt-8">
          <UserInterests />
          <UserReadMe />
          <UserTeamsList />
        </div>
        <div className="py-4 px-8 sm:w-1/4 sm:px-0 sm:pt-8">
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
