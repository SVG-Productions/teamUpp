import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const ListingTabs = () => {
  const { team, listing } = useLoaderData();
  const [tabs, setTabs] = useState("details");

  return (
    <div className="flex gap-5 mb-4">
      <button
        className={`pb-1 w-28 text-center ${
          tabs === "details"
            ? "border-b-[3px] text-bluegray border-bluegray font-bold"
            : "border-b text-slate-400 border-slate-400"
        }`}
        onClick={() => setTabs("details")}
      >
        Details
      </button>
      <button
        className={`pb-1 w-28 text-center ${
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
