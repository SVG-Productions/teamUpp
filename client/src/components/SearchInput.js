const SearchInput = ({ placeholder, searchValue, handleChange }) => {
  return (
    <>
      <input
        className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
        id="search"
        placeholder={placeholder}
        type="text"
        value={searchValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        className="w-1/3 text-sm bg-slate-900 hover:bg-blue-900 text-white 
              font-bold rounded-md focus:shadow-outline sm:w-[100px]"
      >
        Search
      </button>
    </>
  );
};

export default SearchInput;
