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
        name /{" "}
        {first_name ? (
          <span className="text-sm font-bold ">{first_name}</span>
        ) : (
          <NullInfo />
        )}
      </div>
      <div className={listItemStyle}>
        joined / <span className="text-sm font-bold">{formattedDate}</span>
      </div>
      <div className={listItemStyle}>
        linkedIn /{" "}
        {linkedin ? (
          <span className="text-sm font-bold">{linkedin}</span>
        ) : (
          <NullInfo />
        )}
      </div>
      <div className={listItemStyle}>
        github /{" "}
        {github ? (
          <span className="text-sm font-bold">{github}</span>
        ) : (
          <NullInfo />
        )}
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
