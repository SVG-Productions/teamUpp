const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col px-20 pt-4 pb-12 h-[calc(100vh-8rem)] w-full max-w-7xl">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
