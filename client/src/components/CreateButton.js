import AddIcon from "./AddIcon";

const CreateButton = ({ onClick, fill, backgroundColor }) => {
  return (
    <>
      <div
        className={`flex justify-center right-0 top-1 w-8 h-8 text-xl 
        bg-${backgroundColor} hover:bg-slate-400 rounded-full cursor-pointer sm:top-1.5`}
        onClick={onClick}
      >
        <AddIcon iconSize="16px" fill={fill} />
      </div>
    </>
  );
};

export default CreateButton;
