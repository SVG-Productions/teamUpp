import AuthedPageContainer from "../components/AuthedPageContainer";
import AuthedPageTitle from "../components/AuthedPageTitle";

const UserPage = () => {
  return (
    <AuthedPageContainer>
      <AuthedPageTitle>Username</AuthedPageTitle>
      <div className="flex gap-10 my-8 h-2/3">
        <div className="flex flex-col gap-8 p-4 rounded-md w-72 bg-slate-100">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white">
            Profile Pic
          </div>
          <div>
            <div className="p-4">Name</div>
            <div className="p-4">Date Joined</div>
            <div className="p-4">LinkedIn</div>
            <div className="p-4">Github</div>
          </div>
        </div>
        <div className="p-4 w-full rounded-md bg-slate-100">User ReadME</div>
      </div>
      <div className="flex h-1/3 gap-10">
        <div className="p-4 rounded-md w-2/3 bg-slate-100">Teams</div>
        <div className="p-4 rounded-md w-1/3 bg-slate-100">
          All Team Members
        </div>
      </div>
    </AuthedPageContainer>
  );
};

export default UserPage;
