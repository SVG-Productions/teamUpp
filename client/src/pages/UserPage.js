import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import UserInfo from "../components/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import UserInterests from "../components/UserInterests";
import UserReadMe from "../components/UserReadMe";
import UserTeamsList from "../components/UserTeamsList";
import UserTeammatesList from "../components/UserTeammatesList";

export const UserPage = () => {
  const { userData } = useLoaderData();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { username, photo, avatar } = userData;
  const isSessionedUserPage = authedUser.username === username;

  return (
    <>
      <AuthedPageTitle links={[{ label: username }]}>
        {isSessionedUserPage && (
          <FontAwesomeIcon
            icon={faPencil}
            size="lg"
            className="cursor-pointer rounded-full p-2 text-buttonPrimary hover:text-slate-500"
            onClick={() => navigate(`/${username}/settings`)}
          />
        )}
      </AuthedPageTitle>
      <div className="top-32 flex flex-col flex-grow w-full h-full sm:flex-row">
        <div className="sm:w-1/4 sm:bg-secondary">
          <div className="sticky top-32 flex flex-col items-center gap-4 p-4 rounded-sm sm:gap-8">
            <img
              src={photo || avatar}
              className="mt-8 rounded-full"
              width={128}
              height={128}
              alt={username}
            />
            <div className="self-start w-full">
              <UserInfo />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:gap-4 px-8 py-4 sm:w-1/2">
          <UserInterests />
          <UserReadMe />
          <UserTeamsList />
        </div>
        <div className="py-4 px-8 sm:w-1/4 sm:px-0">
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
