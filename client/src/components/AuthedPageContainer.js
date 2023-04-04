const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex flex-col px-20 pt-4 pb-12 h-[calc(100vh-8rem)]">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
