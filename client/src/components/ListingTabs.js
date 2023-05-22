const ListingTabs = ({ tabs, setTabs, experienceId }) => {
  const firstTab = experienceId ? "exp" : "listing";

  return (
    <div className="flex gap-2 justify-center sm:justify-start">
      <div className="flex gap-3 overflow-hidden text-base text-center sm:text-lg">
        <button
          className={`pb-1 w-28 capitalize overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === firstTab
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          } sm:hidden`}
          onClick={() => setTabs(firstTab)}
        >
          {firstTab}
        </button>
        <button
          className={`pb-1 w-28 overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === "experiences"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={() => setTabs("experiences")}
        >
          Experiences
        </button>
        <button
          className={`pb-1 w-28 overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === "comments"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={() => setTabs("comments")}
        >
          Comments
        </button>
      </div>
    </div>
  );
};

export default ListingTabs;
