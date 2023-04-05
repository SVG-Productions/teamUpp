const AuthFormButton = ({ children }) => {
  return (
    <button
      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded focus:shadow-outline"
      type="submit"
    >
      {children}
    </button>
  );
};

export default AuthFormButton;
