import AuthedPageContainer from "../components/AuthedPageContainer";
import AuthedPageTitle from "../components/AuthedPageTitle";

const UserPage = () => {
  return (
    <AuthedPageContainer>
      <AuthedPageTitle>Username</AuthedPageTitle>
      <div className="flex gap-10 my-8 grow-[2]">
        <div className="rounded-md w-72 bg-slate-100">User Info</div>
        <div className="rounded-md grow bg-slate-100">User ReadME</div>
      </div>
      <div className="flex gap-10 grow">
        <div className="rounded-md w-2/3 bg-slate-100">Teams</div>
        <div className="rounded-md w-1/3 bg-slate-100">All Team Members</div>
      </div>
    </AuthedPageContainer>
  );
};

export default UserPage;
