// TaskList.js
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TaskList = memo(({ 
  tasks, 
  editTask, 
  deleteTask, 
  toggleTaskCompletion, 
  isLoading 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (id) => {
    if (editText.trim()) {
      editTask(id, editText);
      setEditingId(null);
      setEditText("");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-24 lg:pb-0">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col space-y-4 animate-pulse"
          >
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="flex justify-end space-x-4">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-24 lg:pb-0">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            handleEditSubmit={handleEditSubmit}
            startEditing={startEditing}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
});

export default TaskList;