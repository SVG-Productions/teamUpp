import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import UserInfo from "../components/UserInfo";
import PencilButton from "../components/PencilButton";
import UserInterests from "../components/UserInterests";
import UserReadMe from "../components/UserReadMe";
import UserTeamsList from "../components/UserTeamsList";
import UserTeammatesList from "../components/UserTeammatesList";

export const UserPage = () => {
  const { user } = useLoaderData();
  const { authedUser } = useAuth();

  const { username } = user;
  const isSessionedUserPage = authedUser.username === user.username;

  return (
    <>
      <AuthedPageTitle links={[{ label: username }]}>
        {isSessionedUserPage && (
          <PencilButton
            href={`/${username}/settings`}
            styling={"bg-slate-100 hover:bg-slate-300 w-10 h-10"}
            iconSize="20px"
            fill="black"
          />
        )}
      </AuthedPageTitle>
      <div className="top-32 flex flex-col flex-grow w-full h-full sm:flex-row">
        <div className="sm:w-1/4 sm:bg-slate-100">
          <div className="sticky top-32 flex flex-col items-center gap-4 p-4 rounded-sm sm:gap-8 sm:bg-slate-100">
            <div className="flex items-center justify-center w-32 h-32 mt-8 rounded-full bg-slate-900 text-white font-bold">
              UI
            </div>
            <div className="self-start">
              <UserInfo user={user} />
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
  const { user, teammates, teams, jobFields } = userResponse.data;

  const filteredTeams = teams.filter(
    (team) => team.status !== "invited" && team.status !== "requested"
  );
  const flattenedJobFields = jobFields.map((jf) => jf.jobField);

  return {
    user,
    teammates,
    userTeams: filteredTeams,
    jobFields: flattenedJobFields,
  };
};
