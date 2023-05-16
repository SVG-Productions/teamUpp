import NullInfo from "./NullInfo";
import formatJoinDate from "../utils/formatJoinDate";

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
      <div className={listItemStyle}>
        <span className="text-sm font-bold">linkedIn / </span>
        {linkedin ? <span>{linkedin}</span> : <NullInfo />}
      </div>
      <div className={listItemStyle}>
        <span className="text-sm font-bold">github / </span>
        {github ? <span>{github}</span> : <NullInfo />}
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
