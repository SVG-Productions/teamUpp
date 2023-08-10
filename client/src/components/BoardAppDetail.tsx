import React, { useState } from "react";
import trimUrl from "../utils/trimUrl";

const BoardAppDetail = ({
  title,
  value,
  name,
}: {
  title: string;
  value: string;
  name: string;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState(value);

  return (
    <div className="flex">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      {name === "jobLink" ? (
        <a
          target="_blank"
          rel="noreferrer"
          className="text-xs w-3/5 py-1 px-1.5 rounded-sm hover:bg-tertiary truncate"
          href={value}
        >
          {trimUrl(value)}
        </a>
      ) : (
        <span className="text-sm w-3/5 py-1 px-1.5 rounded-sm hover:bg-tertiary">
          {value}
        </span>
      )}
    </div>
  );
};

export default BoardAppDetail;
