import { Menu, Upload } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { SettingsBreadcrumb } from "@/components/settings/SettingsBreadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";

let Data = localStorage.getItem("Data");

console.log(JSON.stringify(Data).fullName);

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("fullName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const [profilePicture, setProfilePicture] = useState("/placeholder.svg");

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully!");
  };

  const handleResetDefaults = () => {
    // setName("John Doe");
    // setEmail("john@example.com");
    toast.info("Settings reset to defaults");
  };

  // Modified event handler for image upload (removed TypeScript-specific types)
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <SettingsBreadcrumb />
            <h2 className="text-2xl font-bold text-primary mb-6">Settings</h2>

            {/* Account & Personal Information */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">
                  Account & Personal Information
                </h3>

                {/* Profile Picture */}
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profilePicture} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="picture" className="cursor-pointer">
                      <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                        <Upload className="h-4 w-4" />
                        Upload Picture
                      </div>
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Name & Email */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Password Settings */}
              <div className="p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">
                  Password & Security
                </h3>
                <Button variant="outline" className="w-full mb-4">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Enable Two-Factor Authentication
                </Button>
              </div>

              {/* Help & Support */}
              <div className="p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/faq")}
                  >
                    FAQ
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full">
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </div>

            {/* Save & Reset Options */}
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline" onClick={handleResetDefaults}>
                Reset to Default
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
