import CreateButton from "./CreateButton";

const ListingTabs = ({ tabs, setTabs, experienceId, handleModal }) => {
  const firstTab = experienceId ? "exp" : "listing";

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-3 mb-4 overflow-hidden">
        <button
          className={`pb-1 w-28 text-center text-lg capitalize overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === firstTab
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          } sm:hidden`}
          onClick={() => setTabs(firstTab)}
        >
          {firstTab}
        </button>
        <button
          className={`pb-1 w-28 text-center text-lg overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === "experiences"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={() => setTabs("experiences")}
        >
          Experiences
        </button>
        <button
          className={`pb-1 w-28 text-center text-lg overflow-hidden overflow-ellipsis whitespace-nowrap ${
            tabs === "comments"
              ? "border-b-[3px] text-bluegray border-bluegray font-bold"
              : "border-b text-slate-400 border-slate-400"
          }`}
          onClick={() => setTabs("comments")}
        >
          Comments
        </button>
      </div>
      <div className={`${tabs !== "experiences" && "hidden"}`}>
        <CreateButton
          onClick={() => handleModal(true)}
          fill="white"
          backgroundColor="slate-900"
        />
      </div>
    </div>
  );
};

export default ListingTabs;
