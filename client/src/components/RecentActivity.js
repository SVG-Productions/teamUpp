import { NavLink } from "react-router-dom";
import formatDate from "../utils/formatDate";

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
        className="font-semibold hover:underline"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold hover:underline"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {destination}
      </NavLink>
    );
  }

  if (content === "experience") {
    contentLink = (
      <NavLink
        className="font-semibold hover:underline"
        to={`/teams/${destinationId}/listings/${contentId}/experiences`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold hover:underline"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {destination}
      </NavLink>
    );
  }

  if (content === "listing") {
    contentLink = (
      <NavLink
        className="font-semibold hover:underline"
        to={`/teams/${destinationId}/listings/${contentId}`}
      >
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink
        className="font-semibold hover:underline"
        to={`/teams/${destinationId}`}
      >
        {destination}
      </NavLink>
    );
  }
  return (
    <div
      key={index + activity.username}
      className="flex flex-row bg-white p-2.5 rounded-md"
    >
      <p className="w-full text-xs sm:text-sm">
        <NavLink className="font-semibold hover:underline" to={`/${username}`}>
          {username}
        </NavLink>{" "}
        posted {content === "experience" ? "an" : "a"} {contentLink} to{" "}
        {destinationLink}!
        <span className="float-right text-xs text-gray-500">
          {formatDate(createdAt)}
        </span>
      </p>
    </div>
  );
};

export default RecentActivity;
