import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import NullInfo from "./NullInfo";

const UserInterests = () => {
  const { jobFields } = useLoaderData();

  const [isUserInterestsShowing, setIsUserInterestsShowing] = useState(false);

  return (
    <div>
      <div className="hidden sm:block">
        <p className="font-bold text-slate-400 pb-2">INTERESTS</p>
      </div>
      <div
        onClick={() => setIsUserInterestsShowing(!isUserInterestsShowing)}
        className="flex justify-between cursor-pointer sm:hidden"
      >
        <p className="font-bold text-slate-400 pb-2">INTERESTS</p>
        {isUserInterestsShowing && jobFields.length ? (
          <div className="text-slate-400">&#9650;</div>
        ) : (
          <div className="text-slate-400">&#9660;</div>
        )}
      </div>
      {!jobFields.length ? (
        <div
          className={`px-2 overflow-auto transition-all duration-500 sm:max-h-none ${
            isUserInterestsShowing ? "max-h-[10rem]" : "max-h-0"
          }`}
        >
          <NullInfo />
        </div>
      ) : (
        <ul
          className={`flex flex-col lg:flex-row gap-3 overflow-auto transition-all duration-500 sm:max-h-none ${
            isUserInterestsShowing ? "max-h-[10rem]" : "max-h-0"
          }`}
        >
          {jobFields.map((interest) => (
            <div
              key={interest}
              className="bg-slate-100 py-1 px-2 rounded-full w-fit"
            >
              <p className="capitalize">{interest}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserInterests;
