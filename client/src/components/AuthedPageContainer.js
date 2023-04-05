const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col lg:px-20 pt-4 pb-8 sm:h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-8rem)] w-full max-w-7xl px-8 overflow-scroll">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
