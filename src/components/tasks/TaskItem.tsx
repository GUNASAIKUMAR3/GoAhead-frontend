import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskPriority = "urgent-important" | "urgent" | "important" | "neither";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: TaskPriority;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onPriorityChange: (taskId: number, priority: TaskPriority) => void;
}

export const TaskItem = ({ task, onToggleComplete, onPriorityChange }: TaskItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-feature-bg rounded-lg transition-all hover:shadow-md">
      <span className={task.completed ? "line-through text-gray-500" : ""}>
        {task.title}
      </span>
      <div className="flex items-center gap-2">
        <Select
          value={task.priority}
          onValueChange={(value: TaskPriority) => 
            onPriorityChange(task.id, value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem 
              value="urgent-important"
              className="text-red-500"
            >
              Urgent & Important
            </SelectItem>
            <SelectItem 
              value="urgent"
              className="text-orange-500"
            >
              Urgent
            </SelectItem>
            <SelectItem 
              value="important"
              className="text-blue-500"
            >
              Important
            </SelectItem>
            <SelectItem 
              value="neither"
              className="text-gray-500"
            >
              Neither
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant={task.completed ? "outline" : "default"}
          size="sm"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? "Completed" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
};