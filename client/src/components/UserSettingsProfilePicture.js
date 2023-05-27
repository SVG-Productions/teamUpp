import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const UserSettingsProfilePicture = () => {
  return (
    <>
      <p className="block font-bold self-start text-slate-400 mb-4 text-sm sm:ml-16 sm:mb-2">
        PROFILE PICTURE
      </p>
      <div className="relative w-40 h-40 rounded-full bg-bluegraylight sm:w-56 sm:h-56 sm:mt-12">
        <FontAwesomeIcon
          icon={faPencil}
          size="lg"
          className="absolute cursor-pointer bottom-2 left-2 rounded-full p-2 bg-slate-300 
                  sm:bottom-4 sm:left-4 hover:bg-slate-400"
          onClick={() => {}}
        />
      </div>
    </>
  );
};

export default UserSettingsProfilePicture;
