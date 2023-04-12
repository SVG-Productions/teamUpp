import { NavLink } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import { useAuth } from "../context/AuthContext";

const DeleteAccountPage = () => {
  const { authedUser } = useAuth();
  return (
    <>
      <AuthedPageTitle>
        {authedUser.username} / Settings / Delete Account
      </AuthedPageTitle>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center self-center sm:mt-0 mt-8 w-full px-16 py-24 max-w-xl">
          <p className="sm:text-2xl text-lg text-center">
            Are you sure you want to delete your{" "}
            <span className="font-bold">TeamApp</span> account?
          </p>
          <div className="flex justify-center sm:gap-12 gap-8 mt-32 w-full">
            <NavLink
              to={`/${authedUser.username}/settings`}
              className="w-1/3 min-w-[84px] text-sm sm:text-base text-center bg-slate-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
            >
              Cancel
            </NavLink>
            <button
              className="w-1/3 min-w-[84px] text-sm sm:text-base text-center bg-slate-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountPage;
