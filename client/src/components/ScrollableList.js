const ScrollableList = ({ title, widthString, children }) => {
  return (
    <div className={`flex flex-col rounded-md ${widthString} bg-slate-100`}>
      <div>
        <p className="p-3">{title}</p>
      </div>
      <div className="px-4 py-2 max-h-full overflow-auto">
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
