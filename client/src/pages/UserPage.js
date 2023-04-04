import AuthedPageContainer from "../components/AuthedPageContainer";
import AuthedPageTitle from "../components/AuthedPageTitle";

const UserPage = () => {
  return (
    <AuthedPageContainer>
      <AuthedPageTitle>Username</AuthedPageTitle>
      <div className="flex"></div>
    </AuthedPageContainer>
  );
};

export default UserPage;
