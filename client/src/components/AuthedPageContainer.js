const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] w-full">
      {children}
    </div>
  );
};

export default AuthedPageContainer;