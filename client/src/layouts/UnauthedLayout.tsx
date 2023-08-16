import {
  Navigate,
  Outlet,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import React, { ReactElement } from "react";
import NavbarUnauthed from "../components/NavbarUnauthed";

const UnauthedLayout = ({ children }: { children?: ReactElement }) => {
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
    return <Navigate to={`/${authedUser.username}/apps/board`} />;
  }

  return (
    <>
      <ScrollRestoration />
      <NavbarUnauthed />
      <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] pt-16">
        {children || <Outlet />}
      </div>
      <Footer />
    </>
  );
};

export default UnauthedLayout;
