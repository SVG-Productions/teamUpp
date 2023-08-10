import React, { useState, useRef } from "react";
import trimUrl from "../utils/trimUrl";
import useOnClickOutside from "../hooks/useOnClickOutside";

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
  const editRef = useRef(null);
  useOnClickOutside(editRef, () => setShowInput(false));

  const displayedValue =
    name === "jobLink" ? (
      <a
        className="w-[80%] truncate"
        target="_blank"
        rel="noreferrer"
        href={value}
      >
        {trimUrl(value)}
      </a>
    ) : (
      <span>{value}</span>
    );

  return (
    <div className="flex items-center">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      <div
        ref={editRef}
        onClick={() => setShowInput(true)}
        className="flex text-xs items-center w-3/5 py-1 px-2 rounded-sm truncate hover:bg-tertiary"
      >
        {showInput ? (
          <input
            id={name}
            value={input}
            autoComplete="off"
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            className="text-xs w-full rounded-sm hover:bg-tertiary"
          />
        ) : (
          displayedValue
        )}
      </div>
    </div>
  );
};

export default BoardAppDetail;
