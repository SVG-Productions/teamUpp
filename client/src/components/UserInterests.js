import { useLoaderData } from "react-router-dom";

const UserInterests = () => {
  const { jobFields } = useLoaderData();

  return (
    <>
      <p className="font-bold text-slate-400">INTERESTS</p>
      {!jobFields.length ? (
        <p className="px-4">No interests selected ☹️</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-3">
          {jobFields.map((interest, i) => (
            <div
              key={`${interest}-${i}`}
              className="bg-slate-100 py-1 px-2 rounded-full w-fit"
            >
              <p>{interest}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserInterests;
