import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showOtpModal, setShowOtpModal] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // SEND OTP
    const handleSendOtp = async () => {
        setError("");
        setSuccess("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setShowOtpModal(true);
            } else {
                setError("Failed to send OTP.");
            }
        } catch {
            setError("Server error while sending OTP.");
        }
    };

    // VERIFY OTP
    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter OTP.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.text();

            if (res.ok && data === "Verified") {
                setIsOtpVerified(true);
                setShowOtpModal(false);
                setError("");
                setSuccess("Email verified. You can now reset password.");
            } else {
                setError("Invalid OTP.");
            }
        } catch {
            setError("OTP verification failed.");
        }
    };

    // RESET PASSWORD
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!isOtpVerified) {
            setError("Please verify your email first.");
            return;
        }

        if (!newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail:email,
                    newPassword,
                }),
            });

            if (res.ok) {
                setSuccess("Password reset successfully. Please login.");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setError("Failed to reset password.");
            }
        } catch {
            setError("Server error. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-3xl bg-background border border-border p-6 sm:p-8 shadow-xl">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Reset <span className="text-primary">Password</span>
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Enter your email to reset your password
                        </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsOtpVerified(false);
                                }}
                                className="w-full h-11 rounded-xl border border-border bg-background px-4
                                focus:outline-none focus:ring-2 focus:ring-primary"
                            />

                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className="text-sm text-primary mt-2"
                            >
                                Verify Email
                            </button>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-12
                                    focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
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
                                    className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-12
                                    focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="text-sm text-green-600 text-center">
                                {success}
                            </p>
                        )}

                        <Button
                            variant="hero"
                            className="w-full h-11 text-base"
                            disabled={!isOtpVerified}
                        >
                            Reset Password
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="relative w-80 p-6 rounded-xl 
                        bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-700
                        shadow-lg">

                        <button
                            onClick={() => {
                                setShowOtpModal(false);
                                setOtp("");
                                setError("");
                            }}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
                            Enter OTP
                        </h2>

                        <p className="text-sm text-center mb-3 text-gray-600 dark:text-gray-300">
                            OTP sent to <span className="font-medium">{email}</span>
                        </p>

                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="w-full h-10 border rounded-lg px-3 mb-3
                            border-gray-300 dark:border-gray-600
                            bg-gray-50 dark:bg-gray-700
                            text-gray-900 dark:text-gray-100"
                        />

                        <button
                            onClick={handleVerifyOtp}
                            className="w-full h-10 rounded-lg bg-primary text-white"
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}
