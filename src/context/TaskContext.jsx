import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, dueDate = null) => { 
    if (!text) return; 
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      dueDate, 
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newText, newDueDate = null) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText, dueDate: newDueDate } : task))
    );
    setEditingId(null);
    setEditText("");
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

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        filter,
        editingId,
        editText,
        setEditText,
        addTask,
        editTask,
        deleteTask,
        toggleTaskCompletion,
        startEditing,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);