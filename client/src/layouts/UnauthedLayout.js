import {
  Navigate,
  Outlet,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

const UnauthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <>
        <ScrollRestoration />
        <LoadingSpinner message={"Redirecting..."} />
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
      <ScrollRestoration />
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]">
        {children || <Outlet />}
      </div>
      <Footer />
    </>
  );
};

export default UnauthedLayout;
