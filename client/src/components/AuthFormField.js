const AuthFormField = ({ label, id, type }) => {
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
        placeholder={label}
        required
      />
    </div>
  );
};

export default AuthFormField;
