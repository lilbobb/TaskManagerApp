import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return loadFromLocalStorage("theme", "light");
  });

  useEffect(() => {
    document.documentElement.className = theme;
    saveToLocalStorage("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
