import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AuthedPageContainer from "./AuthedPageContainer";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { authedUser } = useAuth();

  return authedUser ? (
    <div className="flex flex-col min-h-screen items-center bg-white">
      <Navbar />
      <AuthedPageContainer>
        <Outlet />
      </AuthedPageContainer>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedLayout;
