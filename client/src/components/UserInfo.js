import NullInfo from "./NullInfo";
import formatJoinDate from "../utils/formatJoinDate";

const UserInfo = ({ user }) => {
  const { date_joined, email, first_name, github, linkedin, is_email_public } =
    user;

  const date = new Date(date_joined);
  const formattedDate = formatJoinDate(date);

  const withEmailStyling = "sm:py-3 py-1 px-4";
  const withoutEmailStyling = "sm:p-4 py-1 px-4";

  const listItemStyle = is_email_public
    ? withEmailStyling
    : withoutEmailStyling;

  return (
    <>
      <div className={listItemStyle}>
        <span className="text-sm font-bold">name / </span>
        {first_name ? <span>{first_name}</span> : <NullInfo />}
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
      {is_email_public && (
        <div className={listItemStyle}>
          <span>{email}</span>
        </div>
      )}
    </>
  );
};

export default UserInfo;
