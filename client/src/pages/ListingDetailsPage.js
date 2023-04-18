import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";

export const ListingDetailsPage = () => {
  const { team, teammates, listing } = useLoaderData();
  console.log(team, teammates, listing);
  return (
    <>
      <AuthedPageTitle>
        <NavLink to={`/teams/${team.id}`} className="hover:underline">
          {team.name}
        </NavLink>{" "}
        /{" "}
        <NavLink to={`/teams/${team.id}`} className="hover:underline">
          Listings
        </NavLink>{" "}
        / {listing.companyName} - {listing.jobTitle}
      </AuthedPageTitle>
      <div className="flex flex-col sm:flex-row gap-10 mt-8 w-full h-[90%]"></div>
    </>
  );
};

export const listingDetailsLoader = async ({ request, params }) => {
  const { teamId, listingId } = params;
  const [teamData, teammatesData, listingData] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get(`/api/teams/${teamId}/teammates`),
    axios.get(`/api/listings/${listingId}`),
  ]);

  const team = teamData.data;
  const teammates = teammatesData.data.filter(
    (tm) => tm.status !== "invited" && tm.status !== "requested"
  );
  const listing = listingData.data;

  return { team, teammates, listing };
};
