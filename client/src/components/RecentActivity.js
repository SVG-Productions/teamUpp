import { NavLink } from "react-router-dom";
import { formatGeneralDate } from "../utils/dateFormatters";
const RecentActivity = ({ activity, index }) => {
  const {
    username,
    content,
    contentId,
    destination,
    destinationId,
    createdAt,
  } = activity;

  let contentLink, destinationLink;

  if (content === "comment") {
    contentLink = (
      <NavLink
        className="font-semibold text-blue-600"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold text-blue-600"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {destination}
      </NavLink>
    );
  }

  if (content === "experience") {
    contentLink = (
      <NavLink
        className="font-semibold text-blue-600"
        to={`/teams/${destinationId}/listings/${contentId}/experiences`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold text-blue-600"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {destination}
      </NavLink>
    );
  }

  if (content === "listing") {
    contentLink = (
      <NavLink
        className="font-semibold text-blue-600"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold text-blue-600"
        to={`/teams/${destinationId}`}
      >
        {destination}
      </NavLink>
    );
  }
  return (
    <div
      key={index + activity.username}
      className="flex flex-row items-center gap-2 border-x-borderprimary p-2.5 hover:bg-highlight"
    >
      <p className="w-full text-sm truncate sm:text-base">
        <NavLink className="font-semibold text-blue-600" to={`/${username}`}>
          {username}
        </NavLink>{" "}
        posted {content === "experience" ? "an" : "a"} {contentLink} to{" "}
        {destinationLink}!
      </p>
      <span className="float-right text-xs text-gray-500">
        {formatGeneralDate(createdAt)}
      </span>
    </div>
  );
};

export default RecentActivity;
