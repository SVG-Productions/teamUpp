import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";

const UnauthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();

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
