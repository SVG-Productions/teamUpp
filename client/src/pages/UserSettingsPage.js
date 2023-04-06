import AuthedPageTitle from "../components/AuthedPageTitle";
import AuthFormField from "../components/AuthFormField";
import { NavLink } from "react-router-dom";

const UserSettingsPage = () => {
  return (
    <>
      <AuthedPageTitle>Username / Settings</AuthedPageTitle>
      <div className="flex  justify-center">
        <form className=" relative mt-8 border border-slate-300 w-full bg-slate-100 rounded-sm shadow-md p-6 max-w-5xl">
          <button className="absolute right-0 -top-16 border-2 border-red-500 hover:bg-red-200 text-xs font-bold text-red-500 py-2 px-2 mt-2 rounded focus:shadow-outline">
            Delete Account
          </button>
          <div className="flex justify-between">
            <div className="w-1/2">
              <div className="flex justify-between gap-4">
                <AuthFormField label="First Name" id="firstName" type="text" />
                <AuthFormField label="Last Name" id="lastName" type="text" />
              </div>
              <div className="flex justify-between">
                <div className="w-2/3">
                  <AuthFormField label="Email" id="email" type="text" />
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <label
                    className="block font-semibold text-slate-600 mb-2 text-sm text-center"
                    htmlFor="isPrivate"
                  >
                    Email Private?
                  </label>
                  <input
                    label="Email Private?"
                    id="isPrivate"
                    type="checkbox"
                    className="w-5 h-5 mt-2"
                  />
                </div>
              </div>
              <div>
                <AuthFormField label="LinkedIn" id="linkedIn" type="text" />
                <AuthFormField label="Github" id="github" type="text" />
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <p className="block font-semibold text-slate-600 mb-2 text-sm">
                Profile Pic
              </p>
              <div className="relative w-56 h-56 rounded-full bg-white">
                <div className="absolute w-8 h-8 flex items-center justify-center bottom-4 left-4 rounded-full bg-emerald-400 hover:bg-emerald-500">
                  <NavLink className="font-extrabold text-2xl text-white">
                    &#9998;
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="readMe"
              className="block font-semibold text-slate-600 mb-2 text-sm"
            >
              ReadME
            </label>
            <textarea
              id="readMe"
              name="readMe"
              rows="11"
              cols="50"
              placeholder="Tell us a little bit about yourself..."
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink className="w-1/4 text-center bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:shadow-outline">
              Cancel
            </NavLink>
            <button className="w-1/4 bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSettingsPage;
