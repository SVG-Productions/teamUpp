const mockInterests = [
  "Software Engineering",
  "Web Development",
  "React Development",
];

const UserInterests = () => {
  return (
    <>
      <p className="font-bold text-slate-400">INTERESTS</p>
      <div className="flex flex-col lg:flex-row gap-3">
        {mockInterests.map((interest, i) => (
          <div
            key={`${interest}-${i}`}
            className="bg-slate-100 py-1 px-2 rounded-full w-fit"
          >
            <p>{interest}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserInterests;
