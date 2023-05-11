const FormField = ({
  label,
  id,
  type,
  value,
  placeholder,
  onChange,
  required = true,
}) => {
  return (
    <div className="w-full mb-4">
      <label
        className="block font-bold text-slate-400 mb-2 text-sm"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-bluegray"
        id={id}
        type={type}
        value={value}
        placeholder={placeholder || label}
        onChange={onChange}
        autoComplete="off"
        required={required}
      />
    </div>
  );
};

export default FormField;
