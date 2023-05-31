import { useState, useEffect } from "react";
import axios from "axios";

const useTheme = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    if (window === undefined) return;

    const root = window.document.getElementById("root");
    if (theme) {
      root.classList.remove(theme === "dark" ? "light" : "dark");
      root.classList.add(theme === "dark" ? "dark" : "light");
    }
    if (!theme) {
      root.classList.remove("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
