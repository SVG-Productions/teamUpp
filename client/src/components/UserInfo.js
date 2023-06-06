import { formatJoinDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import trimUrl from "../utils/trimUrl";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserInfo = () => {
  const { userData } = useLoaderData();
  const {
    dateJoined,
    email,
    firstName,
    github,
    linkedin,
    isEmailPublic,
    photo,
    avatar,
    username,
  } = userData;

  const { authedUser } = useAuth();
  const navigate = useNavigate();
  const date = new Date(dateJoined);
  const formattedDate = formatJoinDate(date);
  const isSessionedUserPage = authedUser.username === username;

  return (
    <div className="flex flex-col w-full px-2 sm:px-0">
      <img
        src={photo || avatar}
        className="my-6 rounded-full self-center"
        width={200}
        height={200}
        alt={username}
      />
      <div className="py-2 lg:px-8">
        {firstName && <h1 className="font-semibold">{firstName}</h1>}
        <h2 className="text-secondary">{username}</h2>
        <span className="text-tertiary italic text-xs">
          joined {formattedDate}
        </span>
      </div>
      <div className="py-2 mb-4 lg:px-8">
        {isSessionedUserPage && (
          <button
            className="w-full font-semibold text-sm p-2 bg-primary rounded-md text-primary
      border border-slate-400 hover:border-slate-600 hover:bg-highlight"
            onClick={() => navigate(`/${username}/settings`)}
          >
            Edit profile
          </button>
        )}
      </div>
      {linkedin && (
        <div className="py-1 flex items-center lg:px-8">
          <FontAwesomeIcon
            icon={faLink}
            size="sm"
            className="text-slate-500 mr-2"
          />
          <a
            target="_blank"
            rel="noreferrer"
            className="flex overflow-hidden items-center"
            href={linkedin}
          >
            <div className="truncate">{trimUrl(linkedin)}</div>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              size="xs"
              className="ml-2 text-slate-600"
            />
          </a>
        </div>
      )}
      {github && (
        <div className="py-1 flex items-center lg:px-8">
          <FontAwesomeIcon
            icon={faLink}
            size="sm"
            className="text-slate-500 mr-2"
          />
          <a
            target="_blank"
            rel="noreferrer"
            className="flex overflow-hidden items-center"
            href={github}
          >
            <div className="truncate">{trimUrl(github)}</div>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              size="xs"
              className="ml-2 text-slate-600"
            />
          </a>
        </div>
      )}
      {isEmailPublic && (
        <div className="flex py-1 overflow-hidden items-center lg:px-8">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="sm"
            className="text-slate-500 mr-3"
          />
          <p className="truncate">{email}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
