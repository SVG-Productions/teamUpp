import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";

const UnauthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <>
        <LoadingSpinner />
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
          {children || <Outlet />}
        </div>
        <Footer />
      </>
    );
  }

  if (authedUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        {children || <Outlet />}
      </div>
      <Footer />
    </>
  );
};

export default UnauthedLayout;
