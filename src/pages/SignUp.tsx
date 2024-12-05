import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwt_decode } from "jwt-decode-es";

let API_URL = "https://goahead-backend.onrender.com/api/auth"; // Corrected URL for backend

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, data);

      if (response.data.message === "User registered successfully.") {
        //alert("User registered successfully.");
        navigate("/dashboard"); // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  const handleGoogleAuth = async (credentialResponse, isNewUser) => {
    try {
      // Decode the JWT token
      const token = credentialResponse.credential;
      const decoded = jwt_decode(token);

      // Extract user details
      const user = {
        googleId: decoded.sub, // Google's unique user ID
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        isNewUser, // True for signup, false for login
      };

      // Send data to backend using Axios
      const response = await axios.post(`${API_URL}/google`, user);

      // Handle successful response
      console.log(
        `${isNewUser ? "Signup" : "Login"} successful`,
        response.data
      );
      alert(`${isNewUser ? "Signup" : "Login"} successful!`);
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error("Server Error:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Network Error:", error.message);
        alert("Authentication failed. Please check your connection.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-feature-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us to start your journey</p>
        </div>

        <div className="space-y-4">
          <GoogleLogin
            text="signup_with"
            onSuccess={async (credentialResponse) =>
              await handleGoogleAuth(credentialResponse, true)
            }
            onError={() => {
              console.log("signup Failed");
            }}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
