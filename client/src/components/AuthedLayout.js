import {
  Navigate,
  Outlet,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AuthedPageContainer from "./AuthedPageContainer";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const AuthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ScrollRestoration />
      {navigation.state === "loading" && <LoadingSpinner />}
      <div className="flex flex-col min-h-screen items-center bg-white">
        <Navbar />
        <AuthedPageContainer>{children || <Outlet />}</AuthedPageContainer>
        <Footer />
      </div>
    </>
  );
};

export default AuthedLayout;
