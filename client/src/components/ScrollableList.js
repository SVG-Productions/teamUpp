const ScrollableList = ({ title, width, height="auto", children }) => {
  return (
    <div
      className={`flex flex-col flex-grow h-60 sm:h-auto sm:min-h-[264px] rounded-md w-auto ${width} ${height} bg-slate-100`}
    >
      <div>
        <p className="p-3">{title}</p>
      </div>
      <div className="mx-4 mb-4 max-h-full overflow-auto">
        <ul className="flex flex-col gap-2">{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
