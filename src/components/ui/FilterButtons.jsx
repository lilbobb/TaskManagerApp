import React from "react";
import { motion } from "framer-motion";
import { useTasks } from "../../context/TaskContext";
import { capitalize } from "../../utils/helpers";

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

function FilterButtons() {
  const { filter, setFilter } = useTasks();
  const filters = ["all", "completed", "pending"];

  return (
    <div className="m-4">
      <div className="flex lg:hidden gap-2">
        {filters.map((filterType) => (
          <motion.button
            onKeyDown={(e) => e.key === "Enter" && setFilter(filterType)}
            key={filterType}
            onClick={() => setFilter(filterType)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`flex-1 px-3 py-3 rounded-lg capitalize text-sm font-medium text-center transition-colors duration-200 cursor-pointer ${
              filter === filterType
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {capitalize(filterType)}
          </motion.button>
        ))}
      </div>

      <div className="hidden lg:flex flex-col gap-4">
        {filters.map((filterType) => (
          <motion.button
            onKeyDown={(e) => e.key === "Enter" && setFilter(filterType)}
            key={filterType}
            onClick={() => setFilter(filterType)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-3 rounded-lg capitalize text-sm font-medium text-left transition-colors duration-200 cursor-pointer ${
              filter === filterType
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {capitalize(filterType)}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;
