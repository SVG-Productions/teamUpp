import { Navigate, Outlet, useLocation, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";

const UnauthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();
  console.log(navigation);
  const location = useLocation();
  console.log(location);

  if (navigation.state === "loading") {
    return (
      <>
        <LoadingSpinner
          message={
            location.pathname === "/login"
              ? "Logging in..."
              : "Creating user..."
          }
        />
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
