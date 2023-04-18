import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import ScrollableList from "../components/ScrollableList";

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
      <div className="flex flex-col gap-10 mt-8 w-full h-[90%]">
        <div className="flex flex-col h-2/3 w-full">
          <div className="flex gap-3 w-1/4 px-2">
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-4 font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/details`}
            >
              Details
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `border-black pb-1 w-28 text-center ${
                  isActive ? "border-b-4 font-bold" : "border-b"
                }`
              }
              to={`/teams/${team.id}/listings/${listing.id}/experiences`}
            >
              Experiences
            </NavLink>
          </div>
          <div className="flex flex-col sm:flex-row h-full">
            <div className="h-full w-1/2">Details</div>
            <div className="h-full w-1/2">Description</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 h-1/3">
          <ScrollableList title="Comments" width="sm:w-3/5">
            {/* TODO: Comments UI and backend work */}
          </ScrollableList>
          <ScrollableList title="All Teammates" width="sm:w-2/5">
            {teammates.map((teammate, index) => (
              <NavLink
                to={`/${teammate.username}`}
                className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
                key={`${teammate.id}-${index}`}
              >
                <div className="bg-white rounded-full w-6 h-6 mr-4" />
                <p> {teammate.username}</p>
              </NavLink>
            ))}
          </ScrollableList>
        </div>
      </div>
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
