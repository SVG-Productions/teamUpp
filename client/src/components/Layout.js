import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AuthedPageContainer from "./AuthedPageContainer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <AuthedPageContainer>
        <Outlet />
      </AuthedPageContainer>
      <Footer />
    </div>
  );
};

export default Layout;
