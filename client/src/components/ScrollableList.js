import SortByDropdown from "./SortByDropdown";

const ScrollableList = ({
  title,
  width,
  height = "sm:h-auto",
  children,
  sortBy = false,
}) => {
  return (
    <div
      className={`flex flex-col h-60 sm:min-h-[200px] rounded-md w-auto ${width} ${height} bg-slate-100 shadow`}
    >
      <div class="relative flex justify-between z-10 p-3 shadow-[0_0.3px_1px_rgba(0,0,0,0.2)]">
        <p className="font-bold">{title}</p>
        {sortBy && <SortByDropdown />}
      </div>
      <div className="mx-1 mb-1 max-h-full overflow-auto">
        <ul className="flex flex-col gap-1 mb-1">{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
