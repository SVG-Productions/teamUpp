import { useLoaderData } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserInterests = () => {
  const { jobFields } = useLoaderData();

  return (
    <div>
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
  );
};

export default UserInterests;
