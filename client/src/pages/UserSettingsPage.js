import { useState } from "react";
import axios from "axios";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import PencilButton from "../components/PencilButton";
import FormToggle from "../components/FormToggle";
import UserSettingsInterests from "../components/UserSettingsInterests";

export const UserSettingsPage = () => {
  const { user, jobFields: fields } = useLoaderData();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [isEmailPublic, setIsEmailPublic] = useState(user.isEmailPublic);
  const [linkedin, setLinkedin] = useState(user.linkedin || "");
  const [github, setGithub] = useState(user.github || "");
  const [readme, setReadme] = useState(user.readme || "");
  const [selectedItems, setSelectedItems] = useState(fields);

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
      jobFields: selectedItems,
    };
    await axios.patch("/api/session/user", updates);
    navigate(`/${user.username}`);
  };

  return (
    <>
      <AuthedPageTitle
        links={[
          { to: `/${user.username}`, label: user.username },
          { label: "Settings" },
        ]}
      >
        <button
          className="border-2 rounded h-[75%] justify-center self-center text-xs 
          font-bold text-red-500 bg-white border-red-500 hover:bg-red-200 p-2 mt-1"
          to={`/${user.username}/settings/delete-account`}
        >
          Delete Account
        </button>
      </AuthedPageTitle>
      <div className="flex flex-grow justify-center">
        <form
          className="w-full rounded-sm p-6 max-w-5xl sm:bg-slate-100 sm:py-4 sm:px-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="flex flex-col justify-between sm:flex-row sm:gap-4">
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
                  <FormToggle
                    id="isPublic"
                    text="Email Public?"
                    defaultChecked={isEmailPublic}
                    handleChange={setIsEmailPublic}
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
            <div className="flex flex-col items-center w-full mb-8 sm:w-1/2 sm:mb-0">
              <p className="block font-bold self-start text-slate-900 mb-4 text-sm sm:self-center sm:mb-2">
                Profile Picture
              </p>
              <div className="relative w-40 h-40 rounded-full bg-bluegraylight sm:w-56 sm:h-56">
                <PencilButton
                  href=""
                  styling="absolute w-8 h-8 bottom-2 left-2 sm:bottom-4 sm:left-4 bg-slate-900"
                  iconSize="16px"
                  fill="white"
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-2 flex">
            <UserSettingsInterests
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="readMe"
              className="block font-bold text-slate-900 mb-2 text-sm"
            >
              ReadME
            </label>
            <textarea
              id="readMe"
              rows="8"
              cols="50"
              placeholder={readme || "Tell us a little bit about yourself..."}
              value={readme}
              onChange={(e) => setReadme(e.target.value)}
              className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-bluegray resize-none sm:w-4/5"
              required={false}
            />
          </div>
          <div className="flex justify-center align-center gap-5 mt-5">
            <button
              className="w-1/3 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
              font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
            >
              Save
            </button>
            <NavLink
              to={`/${user.username}`}
              className="w-1/3 min-w-[84px] text-sm text-center bg-white hover:bg-gray-300 border-2 
              text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/4 sm:text-base"
            >
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export const userSettingsLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const { user, jobFields } = userResponse.data;
  const flattenedJobFields = jobFields.map((jf) => jf.jobField);
  return { user, jobFields: flattenedJobFields };
};
