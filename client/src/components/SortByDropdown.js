import { useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

const SortByDropdown = ({ sortBy, setSortBy, sortValues }) => {
  const [isListShowing, setIsListShowing] = useState(false);
  const sortButtonRef = useRef();
  useOnClickOutside(sortButtonRef, () => setIsListShowing(false));

  const handleClick = (value) => {
    setIsListShowing(false);
    setSortBy(value);
  };

  return (
    <div className="hidden gap-2 sm:flex">
      <p className="font-bold self-center text-slate-400 sm:text-sm">
        SORT BY:
      </p>
      <div className="self-center" ref={sortButtonRef}>
        <button
          onClick={() => setIsListShowing(isListShowing ? false : true)}
          className="flex justify-between border rounded-md bg-slate-50 px-2 gap-1 w-24"
        >
          <span className="text-sm capitalize text-black">{sortBy}</span>
          <span className="text-[12px] text-slate-500 self-center">
            &#9660;
          </span>
        </button>
        <div className="relative">
          {isListShowing && (
            <div className="absolute w-full items-center right-0 flex flex-col text-black bg-slate-50 shadow-md text-center border border-t-0 rounded-sm">
              {sortValues.map((value) => (
                <button
                  key={value}
                  onClick={() => handleClick(value)}
                  className="hover:bg-blue-200 w-full text-sm py-1 capitalize"
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortByDropdown;
