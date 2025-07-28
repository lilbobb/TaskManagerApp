import React from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const themeToggleVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 }
};

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      variants={themeToggleVariants}
      whileHover="hover"
      whileTap="tap"
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FiMoon className="text-gray-700" size={20} />
      ) : (
        <FiSun className="text-yellow-400" size={20} />
      )}
    </motion.button>
  );
}

export default ThemeToggle;