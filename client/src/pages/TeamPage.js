import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import NullInfo from "../components/NullInfo";
import PencilButton from "../components/PencilButton";
import TeamListings from "../components/TeamListings";
import InviteTeammateForm from "../components/InviteTeammateForm";
import RequestToJoinForm from "../components/RequestToJoinForm";
import TeammatesAndRequests from "../components/TeammatesAndRequests";

export const TeamPage = () => {
  const { team, teammates, authorizedTeammates } = useLoaderData();
  const { authedUser } = useAuth();

  const { id, name, jobField, description } = team;
  const isAuthorized = authorizedTeammates.includes(authedUser.id);
  const isTeammate = teammates.some((tm) => tm.id === authedUser.id);

  return (
    <>
      <AuthedPageTitle
        links={[{ to: `/teams`, label: "Teams" }, { label: name }]}
      >
        {isAuthorized && <PencilButton href={`/teams/${id}/settings`} />}
      </AuthedPageTitle>
      <div className="flex flex-col gap-6 w-full sm:flex-row p-6 sm:gap-8 sm:px-12 sm:pt-8">
        <div className="sm:hidden">{isTeammate && <InviteTeammateForm />}</div>
        <div className="relative sm:w-2/3 h-full">
          {!isTeammate && (
            <div className="absolute border-4 w-full flex flex-col items-center justify-center z-10 backdrop-blur">
              <p className="font-bold">Join {name} to view listings!</p>
              <RequestToJoinForm />
            </div>
          )}
          <TeamListings />
        </div>
        <div className="flex flex-col gap-6 sm:w-1/3 sm:gap-8">
          <div className="hidden sm:block">
            {isTeammate && <InviteTeammateForm />}
          </div>
          <div className="flex flex-col sm:p-2">
            <p className="relative font-bold text-slate-400">TEAM CREDO</p>
            <div className="h-full p-2.5">
              {description ? description : <NullInfo />}
            </div>
          </div>
          <div className="sm:h-2/5">
            <TeammatesAndRequests />
          </div>
        </div>
      </div>
    </>
  );
};

export const teamLoader = async ({ request, params }) => {
  const { teamId } = params;
  const [teamResponse, userResponse] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get("/api/session/user"),
  ]);
  const { favorites } = userResponse.data;
  const { team, teammates, listings } = teamResponse.data;
  const filteredTeammates = teammates.filter(
    (tm) => tm.status !== "invited" && tm.status !== "requested"
  );
  const requested = teammates.filter((tm) => tm.status === "requested");
  const authorizedTeammates = teammates
    .filter((tm) => tm.status === "owner" || tm.status === "admin")
    .reduce((acc, tm) => {
      acc.push(tm.id);
      return acc;
    }, []);

  return {
    team,
    teammates: filteredTeammates,
    requested,
    authorizedTeammates,
    favorites,
    listings,
  };
};
