import { formatJoinDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserSocials from "./UserSocials";

const UserInfo = () => {
  const { userData } = useLoaderData();
  const {
    dateJoined,
    email,
    firstName,
    isEmailPublic,
    photo,
    avatar,
    username,
    socials,
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
        className="my-6 rounded-full self-center w-48 h-48"
        width={192}
        height={192}
        alt={username}
      />
      <div className="py-2 lg:px-8">
        {firstName && <h1 className="font-semibold">{firstName}</h1>}
        <h2 className="text-secondary">{username}</h2>
        <span className="text-tertiary italic text-xs">
          joined {formattedDate}
        </span>
      </div>
      {isSessionedUserPage && (
        <div className="py-2 mb-4 lg:px-8">
          <button
            className="w-full font-semibold text-sm p-2 bg-primary rounded-md text-primary
      border border-slate-400 hover:border-slate-600 hover:bg-highlight"
            onClick={() => navigate(`/${username}/settings`)}
          >
            Edit profile
          </button>
        </div>
      )}
      {socials.length > 0 && <UserSocials />}
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
