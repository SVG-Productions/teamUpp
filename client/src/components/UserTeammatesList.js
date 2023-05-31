import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

const UserTeammatesList = () => {
  const { userData } = useLoaderData();
  const [isTeammatesListShowing, setIsTeammatesListShowing] = useState(false);

  return (
    <>
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() =>
          setIsTeammatesListShowing(isTeammatesListShowing ? false : true)
        }
      >
        <h3 className="font-bold text-headingColor pb-2"> ALL TEAMMATES</h3>
        {isTeammatesListShowing ? (
          <div className="text-headingColor sm:hidden">&#9650;</div>
        ) : (
          <div className="text-headingColor">&#9660;</div>
        )}
      </div>
      <div className="hidden sm:flex">
        <h3 className="font-bold text-headingColor pb-2"> ALL TEAMMATES</h3>
      </div>
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
              <p className="truncate"> {teammate.username}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserTeammatesList;
