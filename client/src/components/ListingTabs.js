import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const ListingTabs = () => {
  const { team, listing } = useLoaderData();
  return (
    <div className="flex gap-5 w-1/4 mb-4">
      <NavLink
        className={({ isActive }) =>
          `pb-1 text-center font-bold text-lg ${
            isActive
              ? "border-b-[3px] text-blue-500 border-blue-500"
              : "border-b text-slate-400 border-slate-400"
          }`
        }
        to={`/teams/${team.id}/listings/${listing.id}`}
      >
        DETAILS
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `pb-1 text-center font-bold text-lg ${
            isActive
              ? "border-b-[3px] text-blue-500 border-blue-500"
              : "border-b text-slate-400 border-slate-400"
          }`
        }
        to={`/teams/${team.id}/listings/${listing.id}/experiences`}
      >
        EXPERIENCES
      </NavLink>
    </div>
  );
};

export default ListingTabs;
