const SearchInput = ({ placeholder, searchValue, handleChange }) => {
  return (
    <>
      <input
        className="border border-borderprimary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
        id="search"
        placeholder={placeholder}
        type="text"
        value={searchValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        className="w-1/3 text-sm bg-buttonPrimary hover:bg-buttonSecondary text-white 
              font-bold rounded-md focus:shadow-outline sm:w-[100px]"
      >
        Search
      </button>
    </>
  );
};

export default SearchInput;
