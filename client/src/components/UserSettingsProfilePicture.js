import { NavLink, useRouteLoaderData } from "react-router-dom";

const UserSettingsProfilePicture = () => {
  const { userData } = useRouteLoaderData("userSettings");
  return (
    <>
      <label className="block font-bold self-start text-headingColor mb-4 text-sm sm:ml-16 sm:mb-2">
        PROFILE PICTURE
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
    </>
  );
};

export default UserSettingsProfilePicture;
