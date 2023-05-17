import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const ListingTabs = () => {
  const { team, listing } = useLoaderData();
  return (
    <div className="flex gap-3 w-1/4 px-2">
      <NavLink
        className={({ isActive }) =>
          `border-black pb-1 w-28 text-center ${
            isActive ? "border-b-[3px] font-bold" : "border-b"
          }`
        }
        to={`/teams/${team.id}/listings/${listing.id}`}
      >
        Details
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `border-black pb-1 w-28 text-center ${
            isActive ? "border-b-[3px] font-bold" : "border-b"
          }`
        }
        to={`/teams/${team.id}/listings/${listing.id}/experiences`}
      >
        Experiences
      </NavLink>
    </div>
  );
};

export default ListingTabs;
