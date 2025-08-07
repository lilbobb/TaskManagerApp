import React, { useState } from "react";
import { FiCheckSquare, FiPlus } from "react-icons/fi";
import TaskList from "./components/tasks/TaskList";
import TaskForm from "./components/tasks/TaskForm";
import FilterButtons from "./components/ui/FilterButtons";
import ThemeToggle from "./components/ui/ThemeToggle";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import { motion } from "framer-motion";
import "./index.css";

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <div className="max-w-7xl mx-auto p-6">
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 pt-6 pb-4 -mx-6 px-6">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center space-x-3">
                  <FiCheckSquare className="text-green-500 text-3xl" />
                  <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
                    Task Manager
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => setShowTaskForm(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    aria-label="Add new task"
                  >
                    <FiPlus size={20} />
                  </motion.button>
                  <ThemeToggle />
                </div>
              </div>

              <div className="lg:hidden sticky top-20 z-10 bg-gray-100 dark:bg-gray-900 pb-2 -mx-6 px-6">
                <FilterButtons />
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-row gap-6">
              <div className="lg:w-1/4 sticky top-28 h-[calc(100vh-9rem)]">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full overflow-y-auto transition-colors duration-300">
                  <FilterButtons />
                </div>
              </div>
              <div className="lg:w-3/4">
                <TaskList
                  isLoading={false}
                  onShowForm={() => setShowTaskForm(true)}
                />
              </div>
            </div>

            <div className="flex flex-col lg:hidden">
              <div className="flex-1 pt-2">
                <div className="px-2">
                  <TaskList
                    isLoading={false}
                    onShowForm={() => setShowTaskForm(true)}
                  />
                </div>
              </div>
            </div>

            <TaskForm
              isOpen={showTaskForm}
              onClose={() => setShowTaskForm(false)}
              onTaskAdded={() => setShowTaskForm(false)}
            />
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;