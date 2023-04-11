const ScrollableList = ({ title, width, height = "sm:h-auto", children }) => {
  return (
    <div
      className={`flex flex-col h-60 sm:min-h-[200px] rounded-md w-auto ${width} ${height} bg-slate-100 shadow`}
    >
      <div>
        <p className="relative z-10 p-3 font-bold shadow-[0_0.3px_1px_rgba(0,0,0,0.2)]">
          {title}
        </p>
      </div>
      <div className="mx-1 mb-1 max-h-full overflow-auto">
        <ul className="flex flex-col gap-1 mb-1">{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
