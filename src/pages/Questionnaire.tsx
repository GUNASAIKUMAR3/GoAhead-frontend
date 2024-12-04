import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [numTasks, setNumTasks] = useState<number>(0);
  const [tasks, setTasks] = useState<string[]>([]);
  const [productivity, setProductivity] = useState<string>("");
  const [yesterdayTasks, setYesterdayTasks] = useState<string>("");
  const [unfinishedTasks, setUnfinishedTasks] = useState<string>("");
  const [reasons, setReasons] = useState<string>("");

  const handleNext = () => {
    if (step === 2 && tasks.length < numTasks) {
      return; // Don't proceed until all tasks are added
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleTaskInput = (taskText: string, index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = taskText;
    setTasks(newTasks);
  };

  const handleSubmit = () => {
    // Here you would typically save the form data
    console.log("Form submitted");
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Hello buddy! 👋</h2>
            <p className="text-gray-600">How many tasks do you want to add to your next todo list?</p>
            <Input
              type="number"
              min="1"
              max="10"
              value={numTasks || ""}
              onChange={(e) => setNumTasks(parseInt(e.target.value) || 0)}
              placeholder="Enter number of tasks"
              className="text-lg"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Let's describe your tasks</h2>
            {Array.from({ length: numTasks }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Label>Task {index + 1}</Label>
                <Textarea
                  value={tasks[index] || ""}
                  onChange={(e) => handleTaskInput(e.target.value, index)}
                  placeholder="Describe your task with proper context"
                  className="min-h-[100px]"
                />
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Rate your productivity</h2>
            <p className="text-gray-600">On a scale of 1 to 10, how productive were you today?</p>
            <RadioGroup
              value={productivity}
              onValueChange={setProductivity}
              className="grid grid-cols-5 gap-4"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(i + 1)} id={`r${i + 1}`} />
                  <Label htmlFor={`r${i + 1}`}>{i + 1}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Yesterday's Progress</h2>
            <div className="space-y-4">
              <div>
                <Label>How many tasks did you complete yesterday?</Label>
                <Input
                  type="number"
                  value={yesterdayTasks}
                  onChange={(e) => setYesterdayTasks(e.target.value)}
                  placeholder="Enter number of completed tasks"
                />
              </div>
              <div>
                <Label>How many tasks were you unable to complete?</Label>
                <Input
                  type="number"
                  value={unfinishedTasks}
                  onChange={(e) => setUnfinishedTasks(e.target.value)}
                  placeholder="Enter number of incomplete tasks"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Understanding Blockers</h2>
            <p className="text-gray-600">What were the reasons for incomplete tasks?</p>
            <Textarea
              value={reasons}
              onChange={(e) => setReasons(e.target.value)}
              placeholder="Distracted due to Scrolling Reels or Improper Sleep Routine"
              className="min-h-[150px]"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-feature-bg pt-20">
      <div className="container max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Step {step} of 5</span>
              <div className="flex gap-2">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {step < 5 ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit</Button>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
