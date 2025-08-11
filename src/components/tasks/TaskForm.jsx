import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import { useTasks } from "../../context/TaskContext";
import { useModal } from "../../utils/hooks";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5, transition: { duration: 0.3 } },
};

const inputVariants = {
  focus: { scale: 1.01 },
  tap: { scale: 0.99 },
};

function TaskForm({ isOpen, onClose, onTaskAdded }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isDateFocused, setIsDateFocused] = useState(false);
  const { addTask } = useTasks();

  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const dateInputRef = useRef(null);

  useModal(isOpen, onClose, modalRef);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isDateFocused && dateInputRef.current) {
      dateInputRef.current.focus();
    }
  }, [isDateFocused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input, dueDate || null);
      setInput("");
      setDueDate("");
      setIsDateFocused(false);
      onClose();
      if (onTaskAdded) onTaskAdded();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
      />
      <motion.div
        ref={modalRef}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm sm:max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Add New Task
            </h2>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
            >
              <FiX size={20} />
            </motion.button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Task
              </label>
              <div className="flex gap-2">
                <motion.input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a new task"
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap="tap"
                  className="flex-1 p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring focus:ring-green-300 dark:focus:ring-green-600 transition-colors duration-200"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <FiSend size={20} />
                </motion.button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <div className="flex gap-2">
                <input
                  ref={dateInputRef}
                  type={isDateFocused || dueDate ? "date" : "text"}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  onFocus={() => setIsDateFocused(true)}
                  onBlur={() => setIsDateFocused(!!dueDate)}
                  placeholder="Add task due date"
                  className="flex-1 p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring focus:ring-green-300 dark:focus:ring-green-600 transition-colors duration-200"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TaskForm;