import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskInputProps {
  newTask: string;
  setNewTask: (task: string) => void;
  handleAddTask: () => void;
}

export const TaskInput = ({ newTask, setNewTask, handleAddTask }: TaskInputProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
        className="flex-1"
      />
      <Button onClick={handleAddTask}>
        <Plus className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </div>
  );
};