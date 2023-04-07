import NullInfo from "./NullInfo";
import formatJoinDate from "../utils/formatJoinDate";

const UserInfo = ({ user }) => {
  const { dateJoined, email, firstName, github, linkedin, isEmailPublic } =
    user;

  const date = new Date(dateJoined);
  const formattedDate = formatJoinDate(date);

  const withEmailStyling = "sm:py-3 py-1 px-4";
  const withoutEmailStyling = "sm:p-4 py-1 px-4";

  const listItemStyle = isEmailPublic ? withEmailStyling : withoutEmailStyling;

  return (
    <>
      <div className={listItemStyle}>
        name /{" "}
        {firstName ? (
          <span className="text-sm font-bold ">{firstName}</span>
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
      {isEmailPublic && (
        <div className={listItemStyle}>
          <span>{email}</span>
        </div>
      )}
    </>
  );
};

export default UserInfo;
