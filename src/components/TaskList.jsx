import React from 'react';
import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

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
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col space-y-4 transition-colors duration-300 border border-gray-200 dark:border-gray-700"
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
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-6 w-6 text-blue-500 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                />
                <span
                  className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex space-x-4 justify-end">
                <button
                  onClick={() => startEditing(task)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
                  aria-label="Edit task"
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  aria-label="Delete task"
                >
                  <FiTrash2 size={18} />
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