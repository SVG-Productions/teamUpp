const AuthFormButton = ({ children }) => {
  return (
    <button
      className="w-full bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
      type="submit"
    >
      {children}
    </button>
  );
};

export default AuthFormButton;
