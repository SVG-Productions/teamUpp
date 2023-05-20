import AddIcon from "./AddIcon";

const CreateButton = ({
  onClick,
  fill,
  backgroundColor,
  iconSize = "16px",
  className = "w-8 h-8",
}) => {
  return (
    <>
      <div
        className={`flex justify-center right-0 top-1 ${className} text-xl 
        bg-${backgroundColor} hover:bg-slate-400 rounded-full cursor-pointer sm:top-1.5`}
        onClick={onClick}
      >
        <AddIcon iconSize={iconSize} fill={fill} />
      </div>
    </>
  );
};

export default CreateButton;
