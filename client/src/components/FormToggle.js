const FormToggle = ({ id, text, defaultChecked, handleChange }) => {
  return (
    <div className="flex flex-col">
      <label
        className="block font-bold text-slate-400 mb-2 text-sm"
        htmlFor={id}
      >
        {text}
      </label>
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={() => handleChange(!defaultChecked)}
        className="self-center mr-2 mt-[0.3rem] h-6 w-10 appearance-none rounded-[1rem]
      after:absolute after:h-5 after:w-5 after:rounded-full after:mt-[0.15rem] after:ml-[0.15rem]
      after:transition-[background-color_0.2s,transform_0.2s] checked:after:ml-[1.08rem] checked:after:mt-[0.15rem] 
      after:bg-white hover:cursor-pointer dark:bg-slate-300 dark:checked:bg-blue-500"
      />
    </div>
  );
};

export default FormToggle;
