import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState("Owner");
    const [error, setError] = useState("");

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpError, setOtpError] = useState("");


    const userTypes = [
        "Owner",
        "Family",
        "Vet",
        "Walker",
        "Groomer",
        "Friend",
    ];

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (pwd: string) =>
        /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,45}$/.test(pwd);

    const handleSendOtp = async () => {
        if (!validateEmail(userEmail)) {
            setError("Enter valid email before verification");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });

            if (res.ok) {
                setIsOtpSent(true);
                setShowOtpModal(true);
            } else {
                setError("Failed to send OTP");
            }
        } catch {
            setError("Server error while sending OTP");
        }
    };


    const handleVerifyOtp = async () => {
        try {
            const res = await fetch(`${API_URL}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: userEmail,
                    otp,
                }),
            });

            const data = await res.text();

            if (res.ok && data === "Verified") {
                setIsOtpVerified(true);
                setShowOtpModal(false);
                setError(null);
                setOtpError(null);
            } else {
                setError("Invalid OTP");
                setOtpError("Invalid OTP");
            }
        } catch {
            setError("OTP verification failed");
        }
    };


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!userName || !userEmail || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (!validateEmail(userEmail)) {
            setError("Please enter a valid email");
            return;
        }
        if (!validatePassword(password)) {
            setError('Password must contain letters & numbers (6–45 chars)');
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!isOtpVerified) {
            setError("Please verify your email before registering.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    userEmail,
                    password,
                    userType,
                }),
            });

            const data = await res.text();

            if (res.ok && data === "Success") {
                navigate("/login");
            } else {
                setError(data || "Registration failed");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    };



    return (
        <Layout>
            <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-3xl bg-background border border-border p-6 sm:p-8 shadow-xl">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Join <span className="text-primary">Petroll</span>
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Create your account to keep pets safe 🐾
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full h-11 rounded-xl border border-border bg-background px-4
                           focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-11 rounded-xl border border-border bg-background px-4
                           focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <Button
                            variant="hero"
                            className="w-full h-11 text-base"
                            onClick={handleSendOtp}
                            disabled={isOtpVerified}
                        >
                            Verify Email
                        </Button>

                        {isOtpVerified && (
                            <p className="text-green-500 text-sm mt-1">
                                Email Verified ✅
                            </p>
                        )}


                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-12
                             focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* User Type */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Registration Type
                            </label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full h-11 rounded-xl border border-border bg-background px-4
                           focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {userTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <Button
                            variant="hero"
                            className="w-full h-11 text-base"
                            disabled={!isOtpVerified}
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            {showOtpModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="relative w-80 p-6 rounded-xl 
                        bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-700
                        shadow-lg">

                        {/* ❌ Close Button */}
                        <button
                            onClick={() => {
                                setShowOtpModal(false);
                                setOtp("");
                                setError("");
                            }}
                            className="absolute top-3 right-3 text-gray-500 
                           hover:text-red-500 transition-colors"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                            Verify Your Email
                        </h2>

                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="w-full h-10 border rounded-lg px-3 mb-3
                           border-gray-300 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-900 dark:text-gray-100
                           placeholder-gray-400 dark:placeholder-gray-300
                           focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {/* Otp Error */}
                        {otpError && (
                            <p className="text-sm text-red-500 text-center">
                                {otpError}
                            </p>
                        )}

                        <button
                            onClick={handleVerifyOtp}
                            className="w-full h-10 rounded-lg bg-primary text-white
                           hover:bg-primary/90 transition-colors"
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}




        </Layout>
    );
}
