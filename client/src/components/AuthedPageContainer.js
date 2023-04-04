const AuthedPageContainer = ({ children }) => {
  return <div className="flex grow flex-col px-20 pt-4 pb-8">{children}</div>;
};

export default AuthedPageContainer;
