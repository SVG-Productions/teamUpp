import { useLoaderData } from "react-router-dom";
import NullInfo from "./NullInfo";

const UserInterests = () => {
  const { userData } = useLoaderData();

  return (
    <div>
      <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
        Interests
      </h1>
      {!userData.jobFields.length ? (
        <div className={`px-2 overflow-auto transition-all duration-500 `}>
          <NullInfo />
        </div>
      ) : (
        <ul className={`flex flex-col lg:flex-row gap-3 overflow-auto`}>
          {userData.jobFields.map((interest) => (
            <li
              key={interest}
              className="bg-secondary py-1 px-2 rounded-full w-fit"
            >
              <p className="capitalize">{interest}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserInterests;
