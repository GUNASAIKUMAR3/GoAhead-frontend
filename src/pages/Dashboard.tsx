import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TaskInput } from "@/components/tasks/TaskInput";
import { TaskList } from "@/components/tasks/TaskList";
import { Task, TaskPriority } from "@/components/tasks/TaskItem";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete project documentation", completed: false, priority: "urgent-important" },
    { id: 2, title: "Review pull requests", completed: true, priority: "important" },
    { id: 3, title: "Team meeting at 2 PM", completed: false, priority: "neither" },
  ]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask.trim(),
          completed: false,
          priority: "neither",
        },
      ]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handlePriorityChange = (taskId: number, priority: TaskPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-feature-bg">
      <div className="container mx-auto px-4">
        {/* Hamburger Menu */}
        <div className="fixed top-4 left-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => navigate("/analysis")}
                >
                  Analysis
                </Button>
                <Button variant="ghost" className="justify-start">
                  Settings
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="pt-20">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Today's Tasks</h2>
            
            <TaskInput
              newTask={newTask}
              setNewTask={setNewTask}
              handleAddTask={handleAddTask}
            />

            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onPriorityChange={handlePriorityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;