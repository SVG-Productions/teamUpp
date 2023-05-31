import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRouteLoaderData } from "react-router-dom";

const UserSettingsProfilePicture = () => {
  const { userData } = useRouteLoaderData("userSettings");
  return (
    <>
      <label className="block font-bold self-start text-headingColor mb-4 text-sm sm:ml-16 sm:mb-2">
        PROFILE PICTURE
      </label>
      <div className="relative w-40 h-40 rounded-full sm:w-56 sm:h-56 sm:mt-12">
        <img
          src={userData.photo || userData.avatar}
          className="w-40 h-40 rounded-full sm:w-56 sm:h-56"
          height={224}
          width={224}
          alt={userData.username}
        />
        <FontAwesomeIcon
          icon={faPencil}
          size="lg"
          className="absolute cursor-pointer bottom-2 left-2 rounded-full p-2 text-iconPrimary 
                  sm:bottom-4 sm:left-4 hover:text-slate-500"
          onClick={() => {}}
        />
      </div>
    </>
  );
};

export default UserSettingsProfilePicture;
