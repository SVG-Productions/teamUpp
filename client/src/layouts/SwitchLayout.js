import React from "react";
import AuthedLayout from "./AuthedLayout";
import UnauthedLayout from "./UnauthedLayout";
import { useAuth } from "../context/AuthContext";

function SwitchLayout({ children }) {
  const { authedUser } = useAuth();

  return (
    <>
      {!authedUser ? (
        <UnauthedLayout>{children}</UnauthedLayout>
      ) : (
        <AuthedLayout>{children}</AuthedLayout>
      )}
    </>
  );
}

export default SwitchLayout;
