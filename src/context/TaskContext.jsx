import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadFromLocalStorage("tasks", []));
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    saveToLocalStorage("tasks", tasks);
  }, [tasks]);

  const addTask = useCallback((text, dueDate = null) => {
    if (!text.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        dueDate,
        createdAt: new Date().toISOString()
      },
    ]);
  }, []);

  const editTask = useCallback((id, newText, newDueDate = null) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, text: newText.trim(), dueDate: newDueDate }
          : task
      )
    );
    setEditingId(null);
    setEditText("");
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleTaskCompletion = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const startEditing = useCallback((task) => {
    setEditingId(task.id);
    setEditText(task.text);
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const value = useMemo(() => ({
    tasks: filteredTasks,
    allTasks: tasks,
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
  }), [filteredTasks, tasks, filter, editingId, editText, addTask, editTask, deleteTask, toggleTaskCompletion, startEditing]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};