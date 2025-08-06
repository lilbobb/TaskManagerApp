// src/components/tasks/TaskItem.jsx
import React, { memo } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTasks } from "../../context/TaskContext";
import { useConfirm } from "../../hooks/useConfirm";

const TaskItem = memo(({ task, isLoading }) => {
  const {
    editingId,
    editText,
    setEditText,
    editTask,
    startEditing,
    toggleTaskCompletion,
    deleteTask,
  } = useTasks();

  const { getConfirmation } = useConfirm();
  const editInputRef = React.useRef(null);

  const iconVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
  };

  React.useEffect(() => {
    if (editingId === task.id && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId, task.id]);

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col space-y-4 animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="flex justify-end space-x-4">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.li
      key={task.id}
      role="listitem"
      aria-labelledby={`task-${task.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col transition-colors duration-300 border border-gray-200 dark:border-gray-700"
    >
      {editingId === task.id ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col space-y-2"
        >
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && editTask(task.id, editText)}
            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
          />
          <button
            onClick={() => editTask(task.id, editText)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 text-sm cursor-pointer"
          >
            Save
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-start space-x-4">
            <motion.input
              aria-label={
                task.completed ? "Mark task incomplete" : "Mark task complete"
              }
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              whileTap={{ scale: 0.9 }}
              className="h-5 w-5 text-green-500 rounded focus:ring-green-500 dark:focus:ring-green-600 mt-1 flex-shrink-0 cursor-pointer"
            />
            <span
              id={`task-${task.id}`}
              className={`text-lg ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : ""
              }`}
            >
              {task.text}
            </span>
          </div>
          <div className="flex space-x-4 justify-end mt-auto pt-4">
            <motion.button
              onClick={() => startEditing(task)}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 cursor-pointer"
              aria-label="Edit task"
            >
              <FiEdit2 size={18} />
            </motion.button>
            <motion.button
              onClick={getConfirmation(
                "Are you sure you want to delete this task?",
                () => deleteTask(task.id)
              )}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer"
              aria-label="Delete task"
            >
              <FiTrash2 size={18} />
            </motion.button>
          </div>
        </div>
      )}
    </motion.li>
  );
});

export default TaskItem;
