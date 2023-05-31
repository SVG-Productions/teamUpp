import axios from "axios";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";

const TeammatesAndRequests = () => {
  const { teamData } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { authedUser } = useAuth();
  const navigate = useNavigate();

  const tab = searchParams.get("tab");
  const isTeammate = teamData.teammates.some((tm) => tm.id === authedUser.id);
  const listedUsers =
    isTeammate && tab && tab.includes("requests")
      ? teamData.requested
      : teamData.teammates;

  const handleAcceptRequest = async (teammate) => {
    await axios.patch(`/api/teams/${teamData.id}/teammates`, {
      userId: teammate.id,
      status: "member",
    });
    navigate(0);
  };

  const handleDenyRequest = async (teammate) => {
    await axios.delete(`/api/teams/${teamData.id}/teammates`, {
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
              ? "border-b-4 border-blueGray text-blueGray font-bold"
              : "border-b text-headingColor border-slate-400"
          }`}
          onClick={() => setSearchParams({})}
        >
          Teammates
        </button>
        {isTeammate && (
          <button
            className={`pb-1 w-28 text-center ${
              tab && tab.includes("requests")
                ? "border-b-4 border-blueGray text-blueGray font-bold"
                : "border-b text-headingColor border-slate-400"
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
        listedUsers.map((teammate) => (
          <div key={`${teammate.id}`} className="flex">
            <NavLink
              to={`/${teammate.username}`}
              className="flex justify-between no-underline text-primary p-2.5 rounded-sm hover:bg-highlight w-full"
            >
              <div className="flex">
                <img
                  src={teammate.photo || teammate.avatar}
                  className="rounded-full mr-4"
                  width={28}
                  height={28}
                  alt={teammate.username}
                />
                <p>
                  {teammate.username}
                  {teammate.status !== "requested" && (
                    <span className="p-4 text-xs text-gray-400">
                      {teammate.status}
                    </span>
                  )}
                </p>
              </div>
              {teammate.status === "requested" && (
                <div className="flex items-center gap-1 mt-1">
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    size="lg"
                    className="text-buttonPrimary cursor-pointer hover:text-green-500"
                    onClick={() => handleAcceptRequest(teammate)}
                  />
                  <FontAwesomeIcon
                    icon={faXmarkSquare}
                    size="lg"
                    className="text-buttonPrimary cursor-pointer hover:text-red-500"
                    onClick={() => handleDenyRequest(teammate)}
                  />
                </div>
              )}
            </NavLink>
          </div>
        ))
      )}
    </>
  );
};

export default TeammatesAndRequests;
