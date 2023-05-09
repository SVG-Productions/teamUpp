const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col pt-4 sm:h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] w-full overflow-auto">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
