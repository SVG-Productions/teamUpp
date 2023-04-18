import { NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";
import AuthedPageTitle from "../components/AuthedPageTitle";

export const DeleteListingPage = () => {
  const { data } = useLoaderData();

  return (
    <AuthedPageTitle>
      <NavLink to="/teams" className="hover:underline">
        Teams
      </NavLink>{" "}
      /{" "}
      <NavLink to={`/teams/${data.teamId}`} className="hover:underline">
        {data.teamName}
      </NavLink>{" "}
      /{" "}
      <NavLink
        to={`/teams/${data.teamId}/listings/${data.id}/details`}
        className="hover:underline"
      >
        {data.companyName} - {data.jobTitle}
      </NavLink>{" "}
      / <NavLink className="hover:underline">Delete</NavLink>
    </AuthedPageTitle>
  );
};

export const deleteListingLoader = async ({ request, params }) => {
  const { listingId } = params;
  const listingData = await axios.get(`/api/listings/${listingId}`);
  return listingData;
};
