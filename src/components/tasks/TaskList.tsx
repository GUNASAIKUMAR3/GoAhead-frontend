import { TaskItem, Task, TaskPriority } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  onPriorityChange: (taskId: number, priority: TaskPriority) => void;
}

const priorityOrder: Record<TaskPriority, number> = {
  "urgent-important": 1,
  "urgent": 2,
  "important": 3,
  "neither": 4,
};

export const TaskList = ({ tasks, onToggleComplete, onPriorityChange }: TaskListProps) => {
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