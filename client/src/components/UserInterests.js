import { useLoaderData } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserInterests = () => {
  const { jobFields } = useLoaderData();

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold text-slate-400 pb-2">INTERESTS</p>
      </div>
      {!jobFields.length ? (
        <div className={`px-2 overflow-auto transition-all duration-500 `}>
          <NullInfo />
        </div>
      ) : (
        <ul className={`flex flex-col lg:flex-row gap-3 overflow-auto`}>
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
