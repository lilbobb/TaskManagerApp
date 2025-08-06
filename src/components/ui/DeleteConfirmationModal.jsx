import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel, taskText }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-200/50 dark:bg-gray-800/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <FiAlertTriangle className="text-red-500 dark:text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Delete Task
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Are you sure you want to delete "{taskText}"? This action cannot
                be undone.
              </p>
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
