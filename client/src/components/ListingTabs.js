const ListingTabs = ({ tabs, setTabs }) => {
  return (
    <div className="flex gap-3 overflow-hidden text-base text-center justify-center sm:mr-10 sm:justify-start sm:text-lg">
      <button
        className={`pb-1 w-28 overflow-hidden truncate ${
          tabs === "listing"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-headingColor border-slate-400"
        } sm:hidden`}
        onClick={() => setTabs("listing")}
      >
        Listing
      </button>
      <button
        className={`pb-1 w-28 overflow-hidden truncate ${
          tabs === "experiences"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-headingColor border-slate-400"
        }`}
        onClick={() => setTabs("experiences")}
      >
        Experiences
      </button>
      <button
        className={`pb-1 w-28 overflow-hidden truncate ${
          tabs === "comments"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-headingColor border-slate-400"
        }`}
        onClick={() => setTabs("comments")}
      >
        Comments
      </button>
    </div>
  );
};

export default ListingTabs;
