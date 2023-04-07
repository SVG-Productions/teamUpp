import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { restoreCSRF, csrfFetch } from "./context/csrf";
import { AuthProvider } from "./context/AuthContext";

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
