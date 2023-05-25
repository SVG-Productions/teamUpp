import { useState } from "react";
import axios from "axios";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import AuthedPageTitle from "../components/AuthedPageTitle";
import FormField from "../components/FormField";
import FormToggle from "../components/FormToggle";
import UserSettingsInterests from "../components/UserSettingsInterests";
import UserSettingsProfilePicture from "../components/UserSettingsProfilePicture";
import DeleteAccountModal from "../components/DeleteAccountModal";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      />
      {/* <button
          className="border-2 rounded justify-center self-center text-xs 
      font-bold text-red-500 bg-white border-red-500 hover:bg-red-200 p-2 mt-1 whitespace-nowrap"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete Account
        </button>
      </AuthedPageTitle> */}
      {/* {isDeleteModalOpen && (
        <DeleteAccountModal handleModal={setIsDeleteModalOpen} />
      )} */}
      <form
        className={`flex flex-col flex-grow self-center w-full 
          ${isDeleteModalOpen && "max-h-[calc(100vh-12rem)] overflow-hidden"}
          rounded-sm p-6 max-w-4xl sm:py-4 sm:px-12 sm:pt-8 sm:max-h-full`}
        onSubmit={handleSubmit}
      >
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
              type="text"
              placeholder={linkedin}
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              required={false}
            />
            <FormField
              label="GITHUB"
              id="github"
              type="text"
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
          <label
            htmlFor="readMe"
            className="block font-bold text-slate-400 mb-2 text-sm"
          >
            README
          </label>
          <ReactQuill
            id="readMe"
            value={readme}
            onChange={setReadme}
            modules={basicModules}
            theme="snow"
          />
        </div>
        <div className="flex justify-center align-center gap-5 mt-5 sm:justify-end">
          <button
            className="w-1/4 min-w-[84px] text-sm bg-bluegray hover:bg-blue-900 text-white 
              font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
          >
            Save
          </button>
          <NavLink
            to={`/${user.username}`}
            className="w-1/4 min-w-[84px] no-underline text-sm text-center bg-white hover:bg-gray-300 border-2 
              text-black font-bold py-2 px-4 rounded-md focus:shadow-outline sm:w-1/6 sm:text-base"
          >
            Cancel
          </NavLink>
        </div>
      </form>
    </>
  );
};

export const userSettingsLoader = async ({ request, params }) => {
  const userResponse = await axios.get("/api/session/user");
  const { user, jobFields } = userResponse.data;
  const flattenedJobFields = jobFields.map((jf) => jf.jobField);
  return { user, jobFields: flattenedJobFields };
};
