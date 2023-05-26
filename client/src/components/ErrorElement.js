import { NavLink } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-gray-500 mb-8"> Something went wrong!</p>
      <NavLink
        to="/"
        className="no-underline text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        Go back home
      </NavLink>
    </div>
  );
};

export default ErrorElement;
