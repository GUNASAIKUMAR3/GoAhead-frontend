import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const navigate = useNavigate();

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
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="pt-20">
          <div className="mt-6 space-y-6">
            {/* Productivity Overview Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-up">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Productivity Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                // ... keep existing code (Task Completion Rate, Productivity
                Score, Weekly Progress sections)
              </div>

              {/* Common Blockers Section */}
              <div className="mt-8 glass p-6 rounded-xl bg-gradient-to-br from-red-50 to-white">
                // ... keep existing code (Common Blockers section)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
