import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useTasks } from "../../context/TaskContext";

const formVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const inputVariants = {
  focus: { scale: 1.01 },
  tap: { scale: 0.99 },
};

function TaskForm({ onTaskAdded }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTask } = useTasks();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input, dueDate || null);
      setInput("");
      setDueDate("");
      inputRef.current?.focus();
      if (onTaskAdded) onTaskAdded();
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="fixed lg:static bottom-0 left-0 right-0 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full bg-gray-100 dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent lg:w-auto p-4 lg:p-0 lg:rounded-none rounded-t-lg shadow-lg lg:shadow-none transition-colors duration-300"
        >
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
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Add task"
            >
              <FiSend size={20} />
            </motion.button>
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring focus:ring-green-300 dark:focus:ring-green-600 transition-colors duration-200"
            min={new Date().toISOString().split("T")[0]}
          />
        </form>
      </div>
    </motion.div>
  );
}

export default TaskForm;