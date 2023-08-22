import { faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm) {
      setSearchParams((prev) => {
        searchParams.delete("search");
        searchParams.set("page", "1");

        return prev;
      });
    } else {
      setSearchParams((prev) => {
        searchParams.set("search", searchTerm);
        searchParams.set("page", "1");

        return prev;
      });
      setSearchTerm("");
    }
  };

  const handleClearSearch = () => {
    setSearchParams((prev) => {
      searchParams.delete("search");
      searchParams.set("page", "1");

      return prev;
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmitSearch}
        className="flex items-center border border-borderprimary rounded py-2 px-3 
          leading-tight focus-within:border-blue-600 sm:w-52"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-sm"
          placeholder="Search this list"
          autoFocus
        />
        <button>
          <FontAwesomeIcon icon={faSearch} className="text-tertiary" />
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
