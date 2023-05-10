import { useState } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

const UserTeammatesList = () => {
  const { teammates } = useLoaderData();
  const [isTeammatesListShowing, setIsTeammatesListShowing] = useState(false);

  return (
    <>
      <div
        className="flex justify-between sm:pr-4 cursor-pointer sm:hidden"
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
      <div className="sm:flex justify-between pr-4 hidden sm:visible">
        <p className="font-bold text-slate-400 pb-2"> ALL TEAMMATES</p>
      </div>
      <ul
        className={`flex flex-col px-2 overflow-auto sm:max-h-none transition-all duration-500 ${
          isTeammatesListShowing ? "max-h-[50rem]" : "max-h-0"
        }`}
      >
        {teammates.map((teammate, index) => (
          <NavLink
            to={`/${teammate.username}`}
            className="flex p-2.5 rounded-sm hover:bg-blue-100"
            key={`${teammate.id}-${index}`}
          >
            <div className="bg-slate-900 rounded-full w-6 h-6 mr-4" />
            <p> {teammate.username}</p>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default UserTeammatesList;
