import {
  NavLink,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";
import NullInfo from "../components/NullInfo";
import PencilButton from "../components/PencilButton";
import AcceptButton from "../components/AcceptButton";
import DenyButton from "../components/DenyButton";
import TeamListings from "../components/TeamListings";
import InviteTeammateForm from "../components/InviteTeammateForm";
import RequestToJoinForm from "../components/RequestToJoinForm";

export const TeamPage = () => {
  const { team, teammates, requested, authorizedTeammates } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const { id, name, jobField, description } = team;
  const isAuthorized = authorizedTeammates.includes(authedUser.id);
  const isTeammate = teammates.some((tm) => tm.id === authedUser.id);
  const tab = searchParams.get("tab");
  const listedUsers =
    isTeammate && tab && tab.includes("requests") ? requested : teammates;

  const handleAcceptRequest = async (teammate) => {
    await axios.patch(`/api/teams/${team.id}/teammates`, {
      userId: teammate.id,
      status: "member",
    });
    navigate(0);
  };

  const handleDenyRequest = async (teammate) => {
    await axios.delete(`/api/teams/${team.id}/teammates`, {
      data: { userId: teammate.id },
    });
    navigate(0);
  };

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
            <div className="flex gap-3 px-2 sm:h-1/7">
              <button
                className={`border-black pb-1 w-28 text-center ${
                  !tab ? "border-b-4 font-bold" : "border-b"
                }`}
                onClick={() => setSearchParams({})}
              >
                Teammates
              </button>
              {isTeammate && (
                <button
                  className={`border-black pb-1 w-28 text-center ${
                    tab && tab.includes("requests")
                      ? "border-b-4 font-bold"
                      : "border-b"
                  }`}
                  onClick={() => setSearchParams({ tab: "requests" })}
                >
                  Requests
                </button>
              )}
            </div>
            <div className="h-60 sm:h-6/7">
              <ScrollableList>
                {listedUsers.length === 0 ? (
                  <p className="p-2.5">Nothing to see here...</p>
                ) : (
                  listedUsers.map((teammate, index) => (
                    <div key={`${teammate.id}-${index}`} className="flex">
                      <NavLink
                        to={`/${teammate.username}`}
                        className="flex p-2.5 rounded-sm hover:bg-blue-100 w-full"
                      >
                        <div className="bg-white rounded-full w-6 h-6 mr-4" />
                        <p>
                          {teammate.username}
                          {teammate.status !== "requested" && (
                            <span className="p-4 text-xs text-gray-400">
                              {teammate.status}
                            </span>
                          )}
                        </p>
                      </NavLink>
                      {teammate.status === "requested" && (
                        <div className="flex">
                          <AcceptButton
                            onClick={() => handleAcceptRequest(teammate)}
                            iconSize="28px"
                          />
                          <DenyButton
                            onClick={() => handleDenyRequest(teammate)}
                            iconSize="28px"
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </ScrollableList>
            </div>
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
