import React, { useState, useRef, FormEvent } from "react";
import trimUrl from "../utils/trimUrl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";

const BoardAppDetail = ({
  title,
  value,
  name,
  appId,
  setAppData,
}: {
  title: string;
  value: string;
  name: string;
  appId: string;
  setAppData: any;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState(value);
  const editRef = useRef(null);

  const handleAcceptEdit = async () => {
    if (value === input) {
      setShowInput(false);
      return;
    }
    try {
      setAppData((prev: any) => ({
        ...prev,
        [name]: input,
      }));
      await axios.patch(`/api/listings/${appId}`, {
        [name]: input,
      });
      setShowInput(false);
    } catch (error) {
      toast.error("Error updating application.", basicToast);
    }
  };

  const handleAcceptEditSubmission = async (e: FormEvent) => {
    e.preventDefault();
    await handleAcceptEdit();
  };

  useOnClickOutside(editRef, handleAcceptEdit);

  const displayedValue =
    name === "jobLink" ? (
      <div className="flex text-xs items-center w-full py-1 px-2 rounded-sm truncate hover:bg-tertiary">
        <a
          className="w-[80%] truncate"
          target="_blank"
          rel="noreferrer"
          href={value}
        >
          {trimUrl(value)}
        </a>
      </div>
    ) : (
      <div className="flex text-xs items-center w-full py-1 px-2 rounded-sm truncate hover:bg-tertiary">
        <span>{value}</span>
      </div>
    );

  return (
    <div className="flex items-center">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      <div className="w-3/5" ref={editRef} onClick={() => setShowInput(true)}>
        {showInput ? (
          <form onSubmit={handleAcceptEditSubmission}>
            <input
              id={name}
              value={input}
              autoComplete="off"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              className="text-xs py-1 px-2 w-full rounded-sm bg-tertiary"
            />
            <button className="hidden">Submit</button>
          </form>
        ) : (
          displayedValue
        )}
      </div>
    </div>
  );
};

export default BoardAppDetail;
