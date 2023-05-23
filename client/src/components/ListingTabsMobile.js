const ListingTabsMobile = ({
  mobileTabs,
  setMobileTabs,
  tabs,
  setTabs,
  experienceId,
}) => {
  const firstTab = experienceId ? "exp" : "listing";

  const handleFirstTabClick = () => {
    setMobileTabs(firstTab);
    setTabs("experiences");
  };

  const handleExperiencesClick = () => {
    setTabs("experiences");
    setMobileTabs("experiences");
  };
  const handleCommentsClick = () => {
    setTabs("comments");
    setMobileTabs("comments");
  };

  return (
    <div className="flex gap-2 justify-center sm:hidden">
      <div className="flex gap-3 overflow-hidden text-base text-center sm:text-lg">
        <button
          className={`pb-1 w-28 capitalize overflow-hidden overflow-ellipsis whitespace-nowrap ${
            mobileTabs === firstTab
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          } sm:hidden`}
          onClick={handleFirstTabClick}
        >
          {firstTab}
        </button>
        <button
          className={`pb-1 w-28 overflow-hidden overflow-ellipsis whitespace-nowrap ${
            mobileTabs === "experiences"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={handleExperiencesClick}
        >
          Experiences
        </button>
        <button
          className={`pb-1 w-28 overflow-hidden overflow-ellipsis whitespace-nowrap ${
            mobileTabs === "comments"
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

export default ListingTabsMobile;
