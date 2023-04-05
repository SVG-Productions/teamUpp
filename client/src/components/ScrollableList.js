const ScrollableList = ({ title, width, children }) => {
  return (
    <div
      className={`flex flex-col h-60 sm:h-auto sm:min-h-[264px] rounded-md w-auto ${width} bg-slate-100`}
    >
      <div>
        <p className="p-3 font-bold">{title}</p>
      </div>
      <div className="mx-4 mb-4 max-h-full overflow-auto">
        <ul className="flex flex-col gap-2">{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
