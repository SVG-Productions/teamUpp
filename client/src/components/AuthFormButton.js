const AuthFormButton = ({ children }) => {
  return (
    <button
      className="w-full bg-bluegray hover:bg-slate-400 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
      type="submit"
    >
      {children}
    </button>
  );
};

export default AuthFormButton;
