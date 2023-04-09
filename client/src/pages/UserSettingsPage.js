import { useState } from "react";
import axios from "axios";
import {
  NavLink,
  Navigate,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";

const UserSettingsPage = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const { authedUser } = useAuth();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [isEmailPublic, setIsEmailPublic] = useState(user.isEmailPublic);
  const [linkedin, setLinkedin] = useState(user.linkedin || "");
  const [github, setGithub] = useState(user.github || "");
  const [readme, setReadme] = useState(user.readme || "");

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      firstName,
      lastName,
      email,
      isEmailPublic,
      linkedin,
      github,
      readme,
    };

    await axios.patch(`/api/users/${user.id}`, updates);
    navigate(`/${user.id}`);
  };

  return (
    <>
      <AuthedPageTitle>{user.username} / Settings</AuthedPageTitle>
      <div className="flex  justify-center">
        <form
          className=" relative mt-8 border border-slate-300 w-full bg-slate-100 rounded-sm shadow-md p-6 max-w-5xl"
          onSubmit={handleSubmit}
        >
          <NavLink
            className="absolute right-0 -top-16 border-2 border-red-500 hover:bg-red-200 text-xs font-bold text-red-500 py-2 px-2 mt-2 rounded focus:shadow-outline"
            to={`/${user.id}/settings/delete-account`}
          >
            Delete Account
          </NavLink>
          <div className="flex flex-col-reverse sm:flex-row justify-between">
            <div className="sm:w-1/2 w-full">
              <div className="flex justify-between gap-4">
                <FormField
                  label="First Name"
                  id="firstName"
                  type="text"
                  placeholder={firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={false}
                />
                <FormField
                  label="Last Name"
                  id="lastName"
                  type="text"
                  placeholder={lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={false}
                />
              </div>
              <div className="flex justify-between">
                <div className="w-2/3">
                  <FormField
                    label="Email"
                    id="email"
                    type="text"
                    placeholder={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <label
                    className="block font-semibold text-slate-600 mb-2 text-sm text-center"
                    htmlFor="isPublic"
                  >
                    Email Public?
                  </label>
                  <input
                    id="isPublic"
                    type="checkbox"
                    defaultChecked={isEmailPublic}
                    onChange={() => setIsEmailPublic(!isEmailPublic)}
                    className="w-5 h-5 mt-2"
                  />
                </div>
              </div>
              <FormField
                label="LinkedIn"
                id="linkedIn"
                type="text"
                placeholder={linkedin}
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                required={false}
              />
              <FormField
                label="Github"
                id="github"
                type="text"
                placeholder={github}
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                required={false}
              />
            </div>
            <div className="flex flex-col items-center w-full sm:w-1/2 sm:mb-0 mb-8">
              <p className="block font-semibold text-slate-600 mb-2 text-sm">
                Profile Pic
              </p>
              <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-white">
                <div className="absolute w-8 h-8 flex items-center justify-center bottom-2 left-2 sm:bottom-4 sm:left-4 rounded-full bg-emerald-400 hover:bg-emerald-500">
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
              rows="11"
              cols="50"
              placeholder={readme || "Tell us a little bit about yourself..."}
              value={readme}
              onChange={(e) => setReadme(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400 resize-none"
              required={false}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <NavLink
              to={`/${user.id}`}
              className="w-1/4 min-w-[84px] text-sm sm:text-base text-center bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
            >
              Cancel
            </NavLink>
            <button className="w-1/4 min-w-[84px] text-sm sm:text-base bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSettingsPage;
