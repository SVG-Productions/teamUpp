const FormToggle = ({ id, text, defaultChecked, handleChange }) => {
  return (
    <>
      <label
        className="block font-bold text-slate-900 mb-2 text-sm text-center"
        htmlFor={id}
      >
        {text}
      </label>
      <input
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={() => handleChange(!defaultChecked)}
        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem]
      after:absolute after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full 
      after:transition-[background-color_0.2s,transform_0.2s] checked:after:ml-[1.0625rem] 
      checked:after:bg-blue-400 hover:cursor-pointer dark:bg-neutral-600 dark:after:bg-neutral-400"
      />
    </>
  );
};

export default FormToggle;
