import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

if (process.env.NODE_ENV !== "production") {
  const restoreCSRF = async () => {
    return await axios.get("/api/csrf/restore");
  };
  restoreCSRF();
}

const healthCheck = async () => {
  return await axios.get("/api/healthcheck");
};
healthCheck();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
