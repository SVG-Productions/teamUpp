import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

const UserTeammatesList = () => {
  const { userData } = useLoaderData();
  const [isTeammatesListShowing, setIsTeammatesListShowing] = useState(false);

  return (
    <div>
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() =>
          setIsTeammatesListShowing(isTeammatesListShowing ? false : true)
        }
      >
        <h1 className="font-semibold text-headingColor pb-2">Teammates</h1>
        {isTeammatesListShowing ? (
          <div className="text-headingColor sm:hidden">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <h2 className="hidden text-headingColor font-semibold pb-2 sm:flex">
        Teammates
      </h2>
      <ul
        className={`flex flex-col overflow-auto transition-all duration-500 sm:max-h-none ${
          isTeammatesListShowing ? "max-h-[50rem]" : "max-h-0 overflow-hidden"
        }`}
      >
        {userData.teammates.map((teammate) => (
          <li key={teammate.id}>
            <NavLink
              to={`/${teammate.username}`}
              className="flex no-underline text-primary p-2.5 rounded-sm hover:bg-highlight"
            >
              <img
                className="rounded-full mr-4"
                src={teammate.photo || teammate.avatar}
                width={28}
                height={28}
                alt={teammate.username}
              />
              <span className="truncate">{teammate.username}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTeammatesList;
