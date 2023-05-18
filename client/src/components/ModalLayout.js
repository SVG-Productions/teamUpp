const ModalLayout = ({ children, handleClickOut }) => {
  return (
    <div className="fixed inset-0 z-20 top-[64px] overflow-y-auto">
      <div className="flex items-center w-full justify-center h-full">
        <div
          className="sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75"
          onClick={() => handleClickOut(false)}
        ></div>
        <div className="fixed inset-0 top-[64px] bg-white sm:hidden"></div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;