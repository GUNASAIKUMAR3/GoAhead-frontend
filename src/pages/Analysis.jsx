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
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
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
          <div className="mt-6 space-y-8">
            {/* Productivity Overview Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-up">
              <h2 className="text-3xl font-bold text-primary mb-8 tracking-tight">
                Productivity Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Task Completion Rate */}
                <div className="glass p-6 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-semibold mb-4 text-lg text-gray-800">
                    Task Completion Rate
                  </h3>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500 animate-pulse"
                      style={{ width: "70%" }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-4 font-medium">
                    70% tasks completed this week
                  </p>
                </div>

                {/* Productivity Score */}
                <div className="glass p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-semibold mb-4 text-lg text-gray-800">
                    Productivity Score
                  </h3>
                  <div className="flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary animate-fade-up">
                      8.5
                    </div>
                    <div className="text-2xl text-gray-400 ml-2">/10</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 font-medium text-center">
                    Based on your recent performance
                  </p>
                </div>

                {/* Weekly Progress */}
                <div className="glass p-6 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-semibold mb-4 text-lg text-gray-800">
                    Weekly Progress
                  </h3>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-green-500 animate-fade-up">
                      +12%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 font-medium text-center">
                    Improvement from last week
                  </p>
                </div>
              </div>

              {/* Common Blockers Section */}
              <div className="mt-12 glass p-8 rounded-xl bg-gradient-to-br from-red-50 to-white shadow-md">
                <h3 className="font-semibold mb-6 text-xl text-gray-800">
                  Common Blockers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-red-500 font-semibold mb-3 text-lg">
                      Social Media
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      2.5 hours daily average
                    </div>
                  </div>
                  <div className="p-6 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-orange-500 font-semibold mb-3 text-lg">
                      Sleep Schedule
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Irregular patterns detected
                    </div>
                  </div>
                  <div className="p-6 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-yellow-600 font-semibold mb-3 text-lg">
                      Unplanned Meetings
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      4 interruptions this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
