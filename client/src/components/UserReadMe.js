import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserReadMe = () => {
  const { user } = useLoaderData();
  const [isReadmeShowing, setIsReadmeShowing] = useState(false);

  const { readme } = user;

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsReadmeShowing(!isReadmeShowing)}
        className="flex justify-between cursor-pointer pb-2 sm:hidden"
      >
        <p className="font-bold text-slate-400">README</p>
        {isReadmeShowing ? (
          <div className="text-slate-400">&#9650;</div>
        ) : (
          <div className="text-slate-400">&#9660;</div>
        )}
      </div>
      <div className="hidden pb-2 sm:flex">
        <p className="font-bold text-slate-400">README</p>
      </div>
      <div
        className={`px-2 overflow-auto transition-all duration-500 sm:max-h-none ${
          isReadmeShowing ? "max-h-[50rem]" : "max-h-0"
        }`}
      >
        {readme ? readme : <NullInfo />}
      </div>
    </div>
  );
};

export default UserReadMe;
