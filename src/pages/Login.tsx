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

let API_URL = "https://goahead-backend.onrender.com/api/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);

      if (response.data.message === "Login successful") {
        // alert("Login successful");
        navigate("/dashboard"); // Redirect to dashboard or another page after successful login
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid credentials. Please try again.");
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

      console.log(user);

      // Send data to backend using Axios
      const response = await axios.post(`${API_URL}/google`, user);

      // Handle successful response
      console.log(
        `${isNewUser ? "Signup" : "Login"} successful`,
        response.data
      );

      if (
        response.data.message === "User created successfully" ||
        response.data.message === "User logged in successfully"
      ) {
        alert(`${isNewUser ? "Signup" : "Login"} successful!`);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        console.error("Error:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server error response
        console.error("Server Error:", error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        // Network error
        console.error("Network Error:", error.message);
        alert("Authentication failed. Please check your connection.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-feature-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue your journey</p>
        </div>

        <div className="space-y-4">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleAuth(credentialResponse, false)
            }
            onError={() => {
              console.log("Login Failed");
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
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Button variant="link" onClick={() => navigate("/signup")}>
            Don't have an account? Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
