import React from 'react';
import { useState } from 'react';

function TaskList({ tasks, editTask, deleteTask, toggleTaskCompletion }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (id) => {
    if (editText.trim()) {
      editTask(id, editText);
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col space-y-4 transition-colors duration-300"
        >
          {editingId === task.id ? (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
              />
              <button
                onClick={() => handleEditSubmit(task.id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 text-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                />
                <span
                  className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(task)}
                  className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="flex-1 px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition-colors duration-200 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;