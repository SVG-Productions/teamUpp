const ListingTabs = ({ tabs, setTabs, experienceId }) => {
  const firstTab = experienceId ? "exp" : "listing";

  return (
    <div className="flex gap-3 mb-4">
      <button
        className={`pb-1 w-28 text-center text-lg capitalize ${
          tabs === firstTab
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-slate-400 border-slate-400"
        } sm:hidden`}
        onClick={() => setTabs(firstTab)}
      >
        {firstTab}
      </button>
      <button
        className={`pb-1 w-28 text-center text-lg ${
          tabs === "experiences"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-slate-400 border-slate-400"
        }`}
        onClick={() => setTabs("experiences")}
      >
        Experiences
      </button>
      <button
        className={`pb-1 w-28 text-center text-lg ${
          tabs === "comments"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-slate-400 border-slate-400"
        }`}
        onClick={() => setTabs("comments")}
      >
        Comments
      </button>
    </div>
  );
};

export default ListingTabs;
