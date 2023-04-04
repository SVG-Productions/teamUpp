const ScrollableList = ({ title, widthString, children }) => {
  return (
    <div className={`flex flex-col rounded-md ${widthString} bg-slate-100`}>
      <div>
        <p className="p-3 z-10">{title}</p>
      </div>
      <div className="p-4 pt-0 pb-2 max-h-full overflow-auto">
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default ScrollableList;
