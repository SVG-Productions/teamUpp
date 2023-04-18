import { Navigate, Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AuthedPageContainer from "./AuthedPageContainer";
import { useAuth } from "../context/AuthContext";

const AuthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {navigation.state === "loading" && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="flex flex-col min-h-screen items-center bg-white">
        <Navbar />
        <AuthedPageContainer>{children || <Outlet />}</AuthedPageContainer>
        <Footer />
      </div>
    </>
  );
};

export default AuthedLayout;
