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
        className="block font-semibold text-slate-600 mb-2 text-sm"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-slate-400"
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
