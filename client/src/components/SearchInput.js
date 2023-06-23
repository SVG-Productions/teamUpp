import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchInput = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setSearchParams((prev) => {
        searchParams.delete("search");
        searchParams.set("page", 1);

        return prev;
      });
    } else {
      setSearchParams((prev) => {
        searchParams.set("search", searchTerm);
        searchParams.set("page", 1);

        return prev;
      });
      setSearchTerm("");
    }
  };

  const handleClearSearch = () => {
    setSearchParams((prev) => {
      searchParams.delete("search");
      searchParams.set("page", 1);

      return prev;
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmitSearch}
        className="flex w-full gap-2 lg:w-[55%]"
      >
        <input
          className="border border-borderprimary rounded w-full py-2 px-3 text-tertiary leading-tight focus:outline-bluegray"
          id="search"
          placeholder={placeholder}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="w-1/3 text-sm bg-buttonPrimary hover:bg-buttonSecondary text-white 
        font-bold rounded-md focus:shadow-outline sm:w-[100px]"
        >
          Search
        </button>
      </form>
      {searchParams.get("search") && (
        <p className="self-start text-primary font-semibold lg:self-center">
          Showing results for{" "}
          <span className="text-secondary font-bold">
            "{searchParams.get("search")}"
          </span>
          <FontAwesomeIcon
            onClick={handleClearSearch}
            className="ml-2 text-primary cursor-pointer"
            icon={faXmarkCircle}
            size="lg"
          />
        </p>
      )}
    </>
  );
};

export default SearchInput;
