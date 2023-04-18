import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-8">Page not found</p>
      <NavLink
        to="/"
        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        Go back home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
