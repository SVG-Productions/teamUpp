import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (window === undefined) return;

    const root = window.document.getElementById("root");
    if (theme && root) {
      root.classList.remove(theme === "dark" ? "light" : "dark");
      root.classList.add(theme === "dark" ? "dark" : "light");
    }
    if (!theme && root) {
      root.classList.remove("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  return [theme, setTheme] as const;
};

export default useTheme;
