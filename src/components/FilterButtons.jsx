import React from 'react';

function FilterButtons({ setFilter, activeFilter }) {
  const filters = ['all', 'completed', 'pending'];

  return (
    <div className="mb-4">
      <div className="flex lg:hidden space-x-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={`flex-1 px-4 py-4 rounded-lg capitalize text-sm font-medium text-center transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="hidden lg:flex flex-col space-y-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={`w-full px-4 py-4 rounded-lg capitalize text-sm font-medium text-left transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterButtons;