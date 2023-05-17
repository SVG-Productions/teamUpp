const ListingTabs = ({ tabs, setTabs }) => {
  return (
    <div className="flex gap-3 mb-4">
      <button
        className={`pb-1 w-28 text-center text-lg ${
          tabs === "details"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-slate-400 border-slate-400"
        }`}
        onClick={() => setTabs("details")}
      >
        Details
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
    </div>
  );
};

export default ListingTabs;
