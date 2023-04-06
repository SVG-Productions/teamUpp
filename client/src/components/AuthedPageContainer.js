const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col lg:px-20 pt-4 pb-8 sm:h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full max-w-7xl px-8 overflow-auto">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
