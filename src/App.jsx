import React from "react";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle theme changes
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Rest of your functions remain exactly the same
  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:flex-row gap-6">
          <div className="lg:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-[80vh] overflow-y-auto transition-colors duration-300">
            <TaskForm addTask={addTask} />
            <FilterButtons setFilter={setFilter} activeFilter={filter} />
          </div>
          <div className="lg:w-3/4">
            <TaskList
              tasks={filteredTasks}
              editTask={editTask}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col min-h-[calc(100vh-120px)] lg:hidden">
          <div className="flex-1 flex flex-col">
            <FilterButtons setFilter={setFilter} activeFilter={filter} />
            <div className="flex-1 overflow-y-auto">
              <TaskList
                tasks={filteredTasks}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleTaskCompletion={toggleTaskCompletion}
              />
            </div>
          </div>
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 transition-colors duration-300">
            <TaskForm addTask={addTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;