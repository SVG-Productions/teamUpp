import axios from "axios";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AcceptButton from "../components/AcceptButton";
import DenyButton from "../components/DenyButton";

const TeammatesAndRequests = () => {
  const { team, teammates, requested } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const tab = searchParams.get("tab");
  const isTeammate = teammates.some((tm) => tm.id === authedUser.id);

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
      <div className="flex gap-3 sm:h-1/7">
        <button
          className={`pb-1 w-28 text-center ${
            !tab
              ? "border-b-4 border-bluegray text-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={() => setSearchParams({})}
        >
          Teammates
        </button>
        {isTeammate && (
          <button
            className={`pb-1 w-28 text-center ${
              tab && tab.includes("requests")
                ? "border-b-4 border-bluegray text-bluegray font-bold"
                : "border-b text-slate-400 border-slate-400"
            }`}
            onClick={() => setSearchParams({ tab: "requests" })}
          >
            Requests
          </button>
        )}
      </div>
      {listedUsers.length === 0 ? (
        <p className="p-2.5">Nothing to see here...</p>
      ) : (
        listedUsers.map((teammate, index) => (
          <div key={`${teammate.id}-${index}`} className="flex">
            <NavLink
              to={`/${teammate.username}`}
              className="flex no-underline text-primary p-2.5 rounded-sm hover:bg-blue-100 w-full"
            >
              <div className="bg-slate-900 rounded-full w-6 h-6 mr-4" />
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
    </>
  );
};

export default TeammatesAndRequests;
