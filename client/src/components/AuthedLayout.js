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
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";

const AuthedLayout = ({ children }) => {
  const { authedUser } = useAuth();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === "idle") setProgress(100);
    if (navigation.state === "submitting") setProgress(30);
    if (navigation.state === "loading") setProgress(progress + 30);
  }, [navigation.state]);

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <ScrollRestoration />
      <LoadingBar
        color="#BFE0FF"
        height={5}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex flex-col min-h-screen items-center bg-white">
        <Navbar />
        <AuthedPageContainer>{children || <Outlet />}</AuthedPageContainer>
        <Footer />
      </div>
    </>
  );
};

export default AuthedLayout;
