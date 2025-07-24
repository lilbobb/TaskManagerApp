import React from 'react';
import { useState } from 'react';

function TaskForm({ addTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <div className="mb-4">
      <form 
        onSubmit={handleSubmit} 
        className="flex gap-2 lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-900 w-full lg:w-auto lg:p-0 p-6 rounded-lg shadow-md lg:shadow-none transition-colors duration-300"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring focus:ring-green-300 dark:focus:ring-green-600 transition-colors duration-200"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TaskForm;