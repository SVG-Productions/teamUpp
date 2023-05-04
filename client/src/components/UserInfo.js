import NullInfo from "./NullInfo";
import formatJoinDate from "../utils/formatJoinDate";
import { useLoaderData } from "react-router-dom";

const UserInfo = ({ user }) => {
  const { jobFields } = useLoaderData();
  const { dateJoined, email, firstName, github, linkedin, isEmailPublic } =
    user;
  const date = new Date(dateJoined);
  const formattedDate = formatJoinDate(date);

  const withEmailStyling = "sm:py-2 py-1 px-4";
  const withoutEmailStyling = "sm:p-3 py-1 px-4";

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
      <div className={listItemStyle}>
        <span className="text-sm font-bold">linkedIn / </span>
        {linkedin ? <span>{linkedin}</span> : <NullInfo />}
      </div>
      <div className={listItemStyle}>
        <span className="text-sm font-bold">github / </span>
        {github ? <span>{github}</span> : <NullInfo />}
      </div>
      <div className={listItemStyle}>
        <span className="text-sm font-bold">job fields / </span>
        {jobFields.length ? (
          <ul>
            {jobFields.map((jf) => {
              return (
                <li className="capitalize border-2 rounded-full text-xs bg-slate-200 hover:bg-slate-300 p-1">
                  {jf}
                </li>
              );
            })}
          </ul>
        ) : (
          <NullInfo />
        )}
      </div>
      {isEmailPublic && (
        <div className={listItemStyle}>
          <span>{email}</span>
        </div>
      )}
    </>
  );
};

export default UserInfo;
