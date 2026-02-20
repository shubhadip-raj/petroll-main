import { useState, useContext } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { UserContext } from "@/contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    setMessage("");

    if (!userEmail || !password) {
      setMessage("All fields are required");
      return;
    }

    if (!validateEmail(userEmail)) {
      setMessage("Please enter a valid email");
      return;
    }

    const user = { userEmail, password };

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setMessage(
          "Invalid login credentials. Please check your email and password."
        );
        return;
      }

      const data = await response.json();

      setUser(data.user);
      setToken(data.token);

      navigate("/homeScreen"); // Replace with your main route

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Check network connection.");
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-background border border-border p-6 sm:p-8 shadow-xl">

          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome Back to <span className="text-primary">Petroll</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Login to continue caring for your pets 🐾
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-background px-4
                           focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-12
                             focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <p className="text-sm text-red-500 text-center">{message}</p>
            )}

            {/* Login Button */}
            <Button
              variant="hero"
              className="w-full h-11 text-base"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground space-y-2">

            {/* Forgot Password */}
            <span className="block">
              <Link
                to="/forgotPassword"
                className="font-medium text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </span>

            {/* Register */}
            <span className="block">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create one
              </Link>
            </span>

          </p>

        </div>
      </div>
    </Layout>
  );
}
