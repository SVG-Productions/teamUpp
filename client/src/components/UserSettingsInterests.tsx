import React, { ChangeEvent, useState } from "react";
import { jobFieldsData } from "../utils/jobFieldsData";
import NullInfo from "./NullInfo";

const UserSettingsInterests = ({
  selectedItems,
  setSelectedItems,
}: {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [jobFieldError, setJobFieldError] = useState(false);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const newResults = jobFieldsData.filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setResults(newResults);
  };

  const handleSelect = (selectedItem: string) => {
    if (selectedItems.length >= 3) {
      setJobFieldError(true);
      setQuery("");
      setResults([]);
      return;
    }
    setSelectedItems([...selectedItems, selectedItem]);
    setQuery("");
    setResults([]);
  };

  const handleRemove = (itemToRemove: string) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
    setJobFieldError(false);
  };
  return (
    <div className="w-full">
      <label
        htmlFor="jobFields"
        className="block font-bold text-headingColor mb-2 text-sm"
      >
        Interests
      </label>
      <div className="flex flex-col w-full">
        <div className="flex flex-col relative sm:w-1/3">
          <input
            type="text"
            className="border border-borderprimary rounded w-full py-2 px-3 
                    text-primary leading-tight focus:outline-bluegray"
            id="jobFields"
            placeholder="Search interests"
            value={query}
            onChange={handleQueryChange}
          />
          {jobFieldError && (
            <p className="text-xs text-red-500">Only 3 job fields allowed!</p>
          )}
          <div className="w-full">
            {results && query && (
              <ul
                className="absolute z-10 w-full min-h-fit max-h-40 bg-secondary 
                border-2 border-borderprimary border-t-0 rounded overflow-auto pl-2"
              >
                {results.length ? (
                  results.map((item) => (
                    <li
                      key={item}
                      className="cursor-pointer text-primary bg-secondary hover:bg-tertiary capitalize"
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <NullInfo message="Sorry, no job fields found." />
                )}
              </ul>
            )}
          </div>
        </div>
        <ul className="flex flex-col w-full py-2 gap-2 sm:flex-row sm:gap-3 sm:items-center">
          {selectedItems.map((item) => (
            <li
              key={item}
              className="flex capitalize w-fit rounded-full text-sm bg-secondary px-2.5 py-1.5"
            >
              {item}
              <button
                className="ml-2 font-bold hover:text-red-500"
                onClick={() => handleRemove(item)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSettingsInterests;
