const AuthedPageContainer = ({ children }) => {
  return (
    <div className="flex grow flex-col items-stretch px-20 py-8">
      {children}
    </div>
  );
};

export default AuthedPageContainer;
