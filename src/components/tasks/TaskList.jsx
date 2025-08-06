import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";
import { useTasks } from "../../context/TaskContext";

const TaskList = memo(({ isLoading, onShowForm }) => {
  const { tasks } = useTasks();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-24 lg:pb-0">
        {[...Array(4)].map((_, i) => (
          <TaskItem key={i} isLoading={true} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState onAddClick={onShowForm} />;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-24 lg:pb-0">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} isLoading={false} />
        ))}
      </AnimatePresence>
    </ul>
  );
});

export default TaskList;