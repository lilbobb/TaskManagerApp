import React from "react";
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
        <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 pt-6 pb-4 -mx-6 px-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          
          <div className="lg:hidden sticky top-20 z-10 bg-gray-100 dark:bg-gray-900 pb-2 -mx-6 px-6">
            <FilterButtons setFilter={setFilter} activeFilter={filter} />
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-row gap-6">
          <div className="lg:w-1/4 sticky top-28 h-[calc(100vh-9rem)]">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full overflow-y-auto transition-colors duration-300">
              <TaskForm addTask={addTask} />
              <FilterButtons setFilter={setFilter} activeFilter={filter} />
            </div>
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

        <div className="flex flex-col lg:hidden">
          <div className="flex-1 pt-2">
            <div className="px-2">
              <TaskList
                tasks={filteredTasks}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleTaskCompletion={toggleTaskCompletion}
              />
            </div>
          </div>
          <div className="sticky bottom-0 p-4 bg-transparent">
            <TaskForm addTask={addTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
