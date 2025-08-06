import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const EmptyState = ({ onAddClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center py-12"
    >
      <div className="relative w-40 h-40 mb-6">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
        <div className="absolute inset-8 flex items-center justify-center">
          <FiPlus className="text-gray-400 dark:text-gray-500 text-4xl" />
        </div>
      </div>
      <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
        No tasks yet
      </h3>
      <p className="text-gray-400 dark:text-gray-500 mb-6 text-center max-w-md">
        Click the button below to add your first task
      </p>
      <motion.button
        onClick={onAddClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-green-500 text-white rounded-full shadow-lg"
        aria-label="Add first task"
      >
        <FiPlus size={24} />
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;