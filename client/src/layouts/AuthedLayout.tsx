import {
  Navigate,
  Outlet,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import LoadingBar from "react-top-loading-bar";
import React, { ReactElement, useEffect, useState } from "react";

const AuthedLayout = ({ children }: { children?: ReactElement }) => {
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
        color="#4862b1"
        height={5}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex flex-col min-h-screen items-center bg-primary text-primary">
        <Navbar />
        <div className="flex flex-col h-[calc(100vh-8rem)] w-full">
          {children || <Outlet />}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AuthedLayout;
