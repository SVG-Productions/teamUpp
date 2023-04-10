import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

const UnauthedLayout = ({ children }) => {
  const { authedUser } = useAuth();

  return !authedUser ? (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        {children || <Outlet />}
      </div>
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default UnauthedLayout;
