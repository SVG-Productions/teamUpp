import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

const UserTeammatesList = () => {
  const { teammates } = useLoaderData();
  const [isTeammatesListShowing, setIsTeammatesListShowing] = useState(false);

  return (
    <>
      <div
        className="flex justify-between cursor-pointer sm:hidden"
        onClick={() =>
          setIsTeammatesListShowing(isTeammatesListShowing ? false : true)
        }
      >
        <p className="font-bold text-slate-400 pb-2"> ALL TEAMMATES</p>
        {isTeammatesListShowing ? (
          <div className="text-slate-400 sm:hidden">&#9650;</div>
        ) : (
          <div className="text-slate-400">&#9660;</div>
        )}
      </div>
      <div className="hidden sm:flex">
        <p className="font-bold text-slate-400 pb-2"> ALL TEAMMATES</p>
      </div>
      <ul
        className={`flex flex-col overflow-auto transition-all duration-500 sm:max-h-none ${
          isTeammatesListShowing ? "max-h-[50rem]" : "max-h-0 overflow-hidden"
        }`}
      >
        {teammates.map((teammate, index) => (
          <NavLink
            to={`/${teammate.username}`}
            className="flex no-underline text-black p-2 rounded-sm hover:bg-blue-100"
            key={`${teammate.id}-${index}`}
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
        ))}
      </ul>
    </>
  );
};

export default UserTeammatesList;
