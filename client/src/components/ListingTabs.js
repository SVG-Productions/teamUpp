const ListingTabs = ({ tabs, setTabs, setMobileTabs }) => {
  const handleExperiencesClick = () => {
    setTabs("experiences");
    setMobileTabs("experiences");
  };
  const handleCommentsClick = () => {
    setTabs("comments");
    setMobileTabs("comments");
  };

  return (
    <div className="gap-2 justify-center hidden sm:flex sm:justify-start">
      <div className="flex gap-3 overflow-hidden text-base text-center sm:text-lg">
        <button
          className={`pb-1 w-28 overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === "experiences"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={handleExperiencesClick}
        >
          Experiences
        </button>
        <button
          className={`pb-1 w-28 overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === "comments"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={handleCommentsClick}
        >
          Comments
        </button>
      </div>
    </div>
  );
};

export default ListingTabs;
