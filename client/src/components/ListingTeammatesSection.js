import { NavLink } from "react-router-dom";
import ScrollableList from "./ScrollableList";

const ListingTeammatesSection = ({ teammates }) => {
  return (
    <ScrollableList title="All Teammates" width="sm:w-2/5">
      {teammates.map((teammate, index) => (
        <NavLink
          key={`${teammate.id}-${index}`}
          to={`/${teammate.username}`}
          className="flex bg-slate-100 p-2.5 rounded-sm hover:bg-blue-100"
        >
          <div className="bg-white rounded-full w-6 h-6 mr-4" />
          <p> {teammate.username}</p>
        </NavLink>
      ))}
    </ScrollableList>
  );
};

export default ListingTeammatesSection;
