import { useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

const SortByDropdown = ({ sortBy, setSortBy }) => {
  const [isListShowing, setIsListShowing] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsListShowing(false));

  const handleClick = (value) => {
    setIsListShowing(false);
    setSortBy(value);
  };

  return (
    <div className="flex gap-2">
      <p className="font-bold">Sort By</p>
      <div>
        <button
          onClick={() => setIsListShowing(isListShowing ? false : true)}
          className=" flex border rounded-sm bg-slate-50 px-2 gap-1 w-16"
        >
          <span className="text-sm">{sortBy}</span>
          <span className="text-[10px] text-slate-500 self-center">
            &#9660;
          </span>
        </button>
        <div className="relative">
          {isListShowing && (
            <div
              ref={ref}
              className="absolute right-0 flex flex-col bg-slate-50 shadow-md text-center border border-t-0 rounded-sm"
            >
              <button
                onClick={() => handleClick("none")}
                className="hover:bg-blue-200 w-16 text-sm py-1"
              >
                none
              </button>
              <button
                onClick={() => handleClick("name")}
                className="hover:bg-blue-200 w-16 text-sm py-1"
              >
                name
              </button>
              <button
                onClick={() => handleClick("field")}
                className="hover:bg-blue-200 w-16 text-sm py-1"
              >
                field
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortByDropdown;
