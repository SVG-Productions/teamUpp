import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import FormField from "../components/FormField";
import FormToggle from "../components/FormToggle";
import UserSettingsInterests from "../components/UserSettingsInterests";
import UserSettingsProfilePicture from "../components/UserSettingsProfilePicture";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";

export const UserProfileSettingsPage = () => {
  const { userData } = useRouteLoaderData("userSettings");
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [isEmailPublic, setIsEmailPublic] = useState(userData.isEmailPublic);
  const [linkedin, setLinkedin] = useState(userData.linkedin || "");
  const [github, setGithub] = useState(userData.github || "");
  const [readme, setReadme] = useState(userData.readme || "");
  const [selectedItems, setSelectedItems] = useState(userData.jobFields);

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
    navigate(`/${userData.username}`);
  };

  return (
    <>
      <form
        className="flex flex-col flex-grow self-center w-full
          rounded-sm max-w-6xl sm:max-h-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-headingColor font-semibold pb-2 mb-4 border-b border-borderprimary">
          Public profile
        </h1>
        <div className="flex flex-col-reverse justify-between sm:flex-row">
          <div className="w-full sm:w-1/2">
            <div className="flex flex-col justify-between sm:flex-row sm:gap-4">
              <FormField
                label="FIRST NAME"
                id="firstName"
                type="text"
                placeholder={firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={false}
              />
              <FormField
                label="LAST NAME"
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
                  label="EMAIL"
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
                  text="EMAIL PUBLIC?"
                  defaultChecked={isEmailPublic}
                  handleChange={setIsEmailPublic}
                />
              </div>
            </div>
            <FormField
              label="LINKEDIN"
              id="linkedIn"
              type="url"
              placeholder={linkedin}
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              required={false}
            />
            <FormField
              label="GITHUB"
              id="github"
              type="url"
              placeholder={github}
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              required={false}
            />
          </div>
          <div className="flex flex-col items-center w-full mb-8 sm:w-1/2 sm:ml-12 sm:mb-0">
            <UserSettingsProfilePicture />
          </div>
        </div>
        <div className="w-full mb-2 flex">
          <UserSettingsInterests
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
        <div className="flex flex-col">
          <label className="block font-bold text-headingColor mb-2 text-sm">
            README
          </label>
          <ReactQuill
            value={readme}
            onChange={setReadme}
            modules={basicModules}
            theme="snow"
          />
        </div>
        <div className="flex justify-center align-center gap-5 mt-5 sm:justify-end">
          <button
            className="w-1/4 min-w-[84px] text-sm bg-buttonPrimary hover:bg-buttonSecondary text-white 
            font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
          >
            Save
          </button>
          <NavLink
            to={`/${userData.username}`}
            className="w-1/4 min-w-[84px] no-underline text-sm text-center hover:bg-highlight border-2 
            text-primary font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
          >
            Cancel
          </NavLink>
        </div>
      </form>
    </>
  );
};