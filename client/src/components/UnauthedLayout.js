import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

const UnauthedLayout = () => {
  const { authedUser } = useAuth();

  return !authedUser ? (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
      <Outlet />
      <Footer />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default UnauthedLayout;
