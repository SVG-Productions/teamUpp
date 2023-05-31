import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useTheme = () => {
  const [theme, setTheme] = useState();
  const { authedUser } = useAuth();

  useEffect(() => {
    if (window === undefined) return;
    // if (!authedUser) return;
    const getUserTheme = async () => {
      const { data: user } = await axios.get("/api/session");
      setTheme(user.theme);
    };
    getUserTheme();
    if (theme) {
      const root = window.document.getElementById("root");
      root.classList.remove(theme === "dark" ? "light" : "dark");
      root.classList.add(theme === "dark" ? "dark" : "light");
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
