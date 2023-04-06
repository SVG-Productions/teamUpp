import NullInfo from "./NullInfo";
import formatJoinDate from "../utils/formatJoinDate";

const UserInfo = ({ user }) => {
  const { date_joined, first_name, github, linkedin } = user;

  const date = new Date(date_joined);
  const formattedDate = formatJoinDate(date);

  return (
    <>
      <div className="sm:p-4 py-1 px-4">
        name /{" "}
        {first_name ? (
          <span className="text-sm font-bold ">{first_name}</span>
        ) : (
          <NullInfo />
        )}
      </div>
      <div className="sm:p-4 py-1 px-4">
        joined / <span className="text-sm font-bold">{formattedDate}</span>
      </div>
      <div className="sm:p-4 py-1 px-4">
        linkedIn /{" "}
        {linkedin ? (
          <span className="text-sm font-bold">{linkedin}</span>
        ) : (
          <NullInfo />
        )}
      </div>
      <div className="sm:p-4 py-1 px-4">
        github /{" "}
        {github ? (
          <span className="text-sm font-bold">{github}</span>
        ) : (
          <NullInfo />
        )}
      </div>
    </>
  );
};

export default UserInfo;
