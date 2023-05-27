import NullInfo from "./NullInfo";
import { formatJoinDate } from "../utils/dateFormatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import trimUrl from "../utils/trimUrl";

const UserInfo = ({ user }) => {
  const { dateJoined, email, firstName, github, linkedin, isEmailPublic } =
    user;
  const date = new Date(dateJoined);
  const formattedDate = formatJoinDate(date);

  const withEmailStyling = "py-2 px-6 sm:py-2 lg:px-8";
  const withoutEmailStyling = "py-2 px-6 sm:p-3 lg:px-8";

  const listItemStyle = isEmailPublic ? withEmailStyling : withoutEmailStyling;

  return (
    <>
      <div className={listItemStyle}>
        <span className="text-sm font-bold ">name / </span>
        {firstName ? <span>{firstName}</span> : <NullInfo />}
      </div>
      <div className={listItemStyle}>
        <span className="text-sm font-bold">joined / </span>
        <span>{formattedDate}</span>
      </div>
      <div className={`${listItemStyle} flex items-center gap-1`}>
        <p className="text-sm font-bold whitespace-nowrap">linkedIn / </p>
        {linkedin ? (
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
        ) : (
          <NullInfo />
        )}
      </div>
      <div className={`${listItemStyle} flex items-center gap-1`}>
        <span className="text-sm font-bold whitespace-nowrap">github / </span>
        {github ? (
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
        ) : (
          <NullInfo />
        )}
      </div>
      {isEmailPublic && (
        <div className={`${listItemStyle} overflow-hidden`}>
          <p className="truncate">{email}</p>
        </div>
      )}
    </>
  );
};

export default UserInfo;
