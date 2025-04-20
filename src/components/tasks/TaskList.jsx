import { TaskItem } from "./TaskItem";

// Priority order without TypeScript typing
const priorityOrder = {
  "urgent-important": 1,
  "urgent": 2,
  "important": 3,
  "neither": 4,
};

export const TaskList = ({ tasks, onToggleComplete, onPriorityChange }) => {
  // Sort the tasks based on priority
  const sortedTasks = [...tasks].sort((a, b) =>
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </div>
  );
};
