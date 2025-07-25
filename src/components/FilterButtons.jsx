import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

function FilterButtons({ setFilter, activeFilter }) {
  const filters = ['all', 'completed', 'pending'];

  return (
    <div className="m-4">
      <div className="flex lg:hidden gap-2">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setFilter(filter)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`flex-1 px-3 py-3 rounded-lg capitalize text-sm font-medium text-center transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      <div className="hidden lg:flex flex-col gap-4">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setFilter(filter)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-3 rounded-lg capitalize text-sm font-medium text-left transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;