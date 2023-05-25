import AddIcon from "./AddIcon";
import SortByDropdown from "./SortByDropdown";

const ScrollableList = ({
  title,
  children,
  hasSortBy = false,
  sortBy,
  setSortBy,
  hasAddButton = false,
  onClick,
}) => {
  return (
    <div className={`pt-1 flex flex-col w-full h-full rounded-md`}>
      {title && (
        <div className="relative flex justify-between p-3">
          <p className="font-bold text-slate-400 text-2xl">{title}</p>
          {hasSortBy && (
            <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
          )}
          {hasAddButton && (
            <button
              onClick={onClick}
              className="flex justify-center items-center w-6 h-6 rounded-full bg-slate-900 hover:bg-slate-400 text-white font-bold text-xl leading-5"
            >
              <AddIcon iconSize="10px" />
            </button>
          )}
        </div>
      )}
      <div className="mx-1 max-h-full overflow-auto">
        <ul className="flex flex-col gap-1 mb-1">{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
