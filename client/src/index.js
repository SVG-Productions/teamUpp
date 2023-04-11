import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

if (process.env.NODE_ENV !== "production") {
  const restoreCSRF = async () => {
    return await axios.get("/api/csrf/restore");
  };
  restoreCSRF();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
