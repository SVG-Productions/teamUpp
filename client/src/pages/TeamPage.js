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
      <div className="relative">
        <AuthedPageTitle
          links={[{ to: `/teams`, label: "Teams" }, { label: name }]}
        />
        <div className="absolute right-0 top-1">
          {isAuthorized && <PencilButton href={`/teams/${id}/settings`} />}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-10 mt-8 w-full h-[90%]">
        <div className="relative sm:w-2/3 h-full">
          {!isTeammate && (
            <div className="absolute border-4 w-full h-full flex flex-col items-center justify-center z-50 backdrop-blur">
              <p className="font-bold">Join {name} to view listings!</p>
            </div>
          )}
          <div className="sm:w-full sm:h-full h-60">
            <TeamListings />
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:w-1/3 h-full">
          {isTeammate ? <InviteTeammateForm /> : <RequestToJoinForm />}
          <div className="flex flex-col max-h-60 sm:max-h-max sm:w-full sm:h-2/3 rounded-sm bg-slate-100 shadow">
            <p className="relative p-3 font-bold shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)]">
              {jobField}
            </p>
            <div className="h-full p-4 m-1 mt-0 bg-white rounded-sm overflow-auto">
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
