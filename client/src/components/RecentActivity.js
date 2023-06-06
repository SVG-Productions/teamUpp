import { NavLink } from "react-router-dom";
import { formatGeneralDate } from "../utils/dateFormatters";
const RecentActivity = ({ activity, index }) => {
  const {
    username,
    photo,
    avatar,
    content,
    contentId,
    destination,
    destinationId,
    createdAt,
    queryId,
  } = activity;

  let contentLink, destinationLink;

  if (content === "comment") {
    contentLink = <span className="font-semibold">{content}</span>;
    destinationLink = (
      <NavLink
        className="font-semibold"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {destination}
      </NavLink>
    );
  }

  if (content === "experience") {
    contentLink = (
      <NavLink
        className="font-semibold"
        to={`/teams/${destinationId}/listings/${contentId}?experience=${queryId}`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {destination}
      </NavLink>
    );
  }

  if (content === "listing") {
    contentLink = (
      <NavLink
        className="font-semibold"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink className="font-semibold" to={`/teams/${destinationId}`}>
        {destination}
      </NavLink>
    );
  }
  return (
    <div
      key={index + activity.username}
      className="flex justify-between items-center gap-2 p-2.5 hover:bg-highlight"
    >
      <div className="flex items-center overflow-hidden">
        <NavLink className="font-semibold mr-2" to={`/${username}`}>
          <img
            src={photo || avatar}
            alt={username}
            width={28}
            height={28}
            className="rounded-full"
          />
        </NavLink>
        <p className="text-xs truncate sm:text-base">
          <span className="font-semibold">{username} </span> posted{" "}
          {content === "experience" ? "an" : "a"} {contentLink} to{" "}
          {destinationLink}!
        </p>
      </div>
      <span className="float-right text-xs text-gray-500">
        {formatGeneralDate(createdAt)}
      </span>
    </div>
  );
};

export default RecentActivity;
