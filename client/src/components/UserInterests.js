import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import NullInfo from "./NullInfo";

const UserInterests = () => {
  const { jobFields } = useLoaderData();

  const [isUserInterestsShowing, setIsUserInterestsShowing] = useState(false);

  return (
    <>
      <div className="hidden sm:block">
        <p className="font-bold text-slate-400">INTERESTS</p>
        {!jobFields.length ? (
          <NullInfo />
        ) : (
          <div className="flex flex-col lg:flex-row gap-3 p-2">
            {jobFields.map((interest, i) => (
              <div
                key={`${interest}-${i}`}
                className="bg-slate-100 py-1 px-2 rounded-full w-fit"
              >
                <p className="capitalize">{interest}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sm:hidden">
        <div
          onClick={() => setIsUserInterestsShowing(!isUserInterestsShowing)}
          className="flex justify-between cursor-pointer"
        >
          <p className="font-bold text-slate-400">INTERESTS</p>
          {isUserInterestsShowing && jobFields.length ? (
            <div className="text-slate-500">&#9650;</div>
          ) : (
            <div className="text-slate-500">&#9660;</div>
          )}
        </div>
        {!jobFields.length && <NullInfo />}
        {isUserInterestsShowing && (
          <ul className="flex flex-col lg:flex-row gap-3 p-2">
            {jobFields.map((interest, i) => (
              <div
                key={`${interest}-${i}`}
                className="bg-slate-100 py-1 px-2 rounded-full w-fit"
              >
                <p className="capitalize">{interest}</p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UserInterests;
