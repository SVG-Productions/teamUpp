import PencilButton from "../components/PencilButton";

const UserSettingsProfilePicture = () => {
  return (
    <>
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
    </>
  );
};

export default UserSettingsProfilePicture;
