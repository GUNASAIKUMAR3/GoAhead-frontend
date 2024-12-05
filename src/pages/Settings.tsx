import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Settings = () => {
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Settings</h2>
            
            {/* Settings Content */}
            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
                <p className="text-gray-600">Manage your profile information and preferences</p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
                <p className="text-gray-600">Configure your notification preferences</p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
                <p className="text-gray-600">Manage your privacy and security settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;