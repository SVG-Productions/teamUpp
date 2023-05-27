import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window === undefined) return;
    const root = window.document.getElementById("root");
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  console.log(theme);

  return [theme, setTheme];
};

export default useTheme;
