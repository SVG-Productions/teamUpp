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
      <NavLink to={`/teams/${destinationId}/listings/${contentId}/details`}>
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink to={`/teams/${destinationId}`}>{destination}</NavLink>
    );
  }

  if (content === "experience") {
    contentLink = (
      <NavLink to={`/teams/${destinationId}/listings/${contentId}/details`}>
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink to={`/teams/${destinationId}`}>{destination}</NavLink>
    );
  }

  if (content === "listing") {
    contentLink = (
      <NavLink to={`/teams/${destinationId}/listings/${contentId}/details`}>
        {content}
      </NavLink>
    );
    destinationLink = (
      <NavLink to={`/teams/${destinationId}`}>{destination}</NavLink>
    );
  }
  return (
    <div
      key={index + activity.username}
      className="flex flex-row bg-white p-2.5 rounded-md"
    >
      <p>
        {username} posted a {contentLink} to {destinationLink} at{" "}
        {formatDate(createdAt)}
      </p>
    </div>
  );
};

export default RecentActivity;
