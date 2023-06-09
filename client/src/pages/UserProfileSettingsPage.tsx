import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { NavLink, useRevalidator, useRouteLoaderData } from "react-router-dom";
import FormField from "../components/FormField";
import FormToggle from "../components/FormToggle";
import UserSettingsInterests from "../components/UserSettingsInterests";
import ReactQuill from "react-quill";
import { basicModules } from "../utils/quillModules";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { UserType } from "../../type-definitions";

export const UserProfileSettingsPage = () => {
  const { userData } = useRouteLoaderData("userSettings") as {
    userData: UserType;
  };
  const revalidator = useRevalidator();
  const initialSocials = [
    ...userData.socials,
    ...Array(4 - userData.socials.length).fill(""),
  ];

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [isEmailPublic, setIsEmailPublic] = useState(userData.isEmailPublic);
  const [readme, setReadme] = useState(userData.readme || "");
  const [selectedItems, setSelectedItems] = useState(userData.jobFields);
  const [socials, setSocials] = useState(initialSocials);

  const handleSocialsChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setSocials((prevSocials) => {
      const updatedSocials = [...prevSocials];
      updatedSocials[index] = e.target.value;
      return updatedSocials;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const updates = {
        firstName,
        lastName,
        email,
        isEmailPublic,
        readme,
        jobFields: selectedItems,
        socials: socials.filter((s) => s && s),
      };
      const response = await axios.patch("/api/users/user", updates);
      revalidator.revalidate();
      toast.success(response.data.message, basicToast);
    } catch (error: any) {
      toast.error(error.response.data.message, basicToast);
    }
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
                label="First name"
                id="firstName"
                type="text"
                placeholder={firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={false}
              />
              <FormField
                label="Last name"
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
                  text="Email public?"
                  defaultChecked={isEmailPublic}
                  handleChange={setIsEmailPublic}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <label className="block font-bold text-headingColor mb-2 text-sm">
                Socials
              </label>
              {socials.map((s, i) => (
                <input
                  key={i}
                  type="url"
                  className="border border-borderprimary rounded w-full my-0.5 py-2 px-3 text-primary leading-tight sm:w-4/5 focus:outline-bluegray"
                  value={s}
                  onChange={(e) => handleSocialsChange(e, i)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center w-full mb-8 sm:w-1/2 sm:ml-12 sm:mb-0">
            <label className="block font-bold self-start text-headingColor mb-4 text-sm sm:ml-16 sm:mb-2">
              Profile picture
            </label>
            <div className="relative w-40 h-40 rounded-full sm:w-56 sm:h-56 sm:mt-12">
              <NavLink to={`/${userData.username}/settings/photo`}>
                <img
                  src={userData.photo || userData.avatar}
                  className="w-40 h-40 rounded-full sm:w-56 sm:h-56"
                  height={224}
                  width={224}
                  alt={userData.username}
                />
              </NavLink>
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
          <label className="block font-bold text-headingColor mb-2 text-sm">
            Readme
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
