import React from "react";
import { motion } from "framer-motion";

const ListingTabs = ({
  tabs,
  setTabs,
}: {
  tabs: string;
  setTabs: (tabs: string) => void;
}) => {
  return (
    <div className="flex gap-1">
      <button
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
        className={`${
          tabs === "listing" ? "text-bgButton" : "hover:text-secondary"
        } relative rounded-full p-1.5 transition font-bold focus-visible:outline-2 sm:hidden`}
        onClick={() => setTabs("listing")}
      >
        Listing
        {tabs === "listing" && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 left-0 right-0 h-1 w-full bg-buttonPrimary text-white"
            style={{ borderRadius: 9999 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <button
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
        className={`${
          tabs === "experiences" ? "text-bgButton" : "hover:text-secondary"
        } relative rounded-full p-1.5 transition font-bold focus-visible:outline-2`}
        onClick={() => setTabs("experiences")}
      >
        Experiences
        {tabs === "experiences" && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 left-0 right-0 h-1 w-full bg-buttonPrimary text-white"
            style={{ borderRadius: 9999 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <button
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
        className={`${
          tabs === "comments" ? "text-bgButton" : "hover:text-secondary"
        } relative rounded-full p-1.5 transition font-bold focus-visible:outline-2`}
        onClick={() => setTabs("comments")}
      >
        Comments
        {tabs === "comments" && (
          <motion.div
            layoutId="underline"
            className="absolute left-0 right-0 bottom-0 h-1 w-full bg-buttonPrimary"
            style={{ borderRadius: 9999 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
    </div>
  );
};

export default ListingTabs;
