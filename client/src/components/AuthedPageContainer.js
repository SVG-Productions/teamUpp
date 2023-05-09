const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col sm:min-h-[calc(100vh-8rem)] w-full overflow-auto">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
