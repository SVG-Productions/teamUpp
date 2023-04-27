import { NavLink, useLoaderData } from "react-router-dom";
import ScrollableList from "./ScrollableList";

const UserTeams = () => {
  const { userTeams } = useLoaderData();

  return (
    <ScrollableList title="Your Teams">
      {userTeams.map((team) => (
        <NavLink
          to={`/teams/${team.id}`}
          key={team.id}
          className="flex justify-between bg-white p-2.5 border-t-[0.5px] border-l-[0.5px] rounded-sm shadow-[0_0.3px_1px_rgba(0,0,0,0.2)] hover:bg-blue-200"
        >
          <p className="text-xs sm:text-base">{team.name}</p>
          <div
            className={`w-6 h-6 rounded-full text-center text-white ${
              team.status === "invited" || team.status === "requested"
                ? "bg-yellow-300"
                : "bg-emerald-400"
            } `}
          />
        </NavLink>
      ))}
    </ScrollableList>
  );
};

export default UserTeams;
