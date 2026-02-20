import { useContext, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "@/contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(UserContext);

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

    const [googleCredToken, setGoogleCredToken] = useState("");
    const [showGoogleUserTypeModal, setShowGoogleUserTypeModal] = useState(false);

    const [loading, setLoading] = useState(false);

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
                setError("");
                setOtpError("");
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

    // const handleGoogleSignup = async (credentialResponse) => {
    //     try {
    //         const response = await fetch(`${API_URL}/auth/google`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 token: credentialResponse.credential,
    //             }),
    //         });

    //         if (!response.ok) {
    //             setError("Google signup failed");
    //             return;
    //         }

    //         const data = await response.json();
    //         navigate("/homeScreen");
    //     } catch (err) {
    //         setError("Google authentication error");
    //     }
    // };

    const handleGoogleSignup = (credentialResponse) => {
        // Save Google token
        setGoogleCredToken(credentialResponse.credential);

        // Open userType modal
        setShowGoogleUserTypeModal(true);
    };
    const handleGoogleRegisterFinal = async (selectedType: string) => {
        if (!googleCredToken) {
            setError("Google token missing");
            return;
        }

        setLoading(true);  // start loading
        setError("");

        try {
            const response = await fetch(`${API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: googleCredToken,
                    userType: selectedType,
                }),
            });

            if (!response.ok) {
                const msg = await response.text();
                setError(msg || "Google signup failed");
                setLoading(false);
                return;
            }

            const data = await response.json();
            setShowGoogleUserTypeModal(false);

            setUser(data.user);
            setToken(data.token);

            setLoading(false);
            navigate("/homeScreen");  // navigate only after loading finishes

        } catch (err) {
            console.error(err);
            setError("Google authentication error");
            setLoading(false);
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

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        <Button
                            variant="hero"
                            className="w-full h-11 text-base"
                            disabled={!isOtpVerified}
                        >
                            Create Account
                        </Button>

                    </form>

                    {/* Google Signup */}
                    <div className="flex justify-center mt-4">
                        <GoogleLogin
                            onSuccess={handleGoogleSignup}
                            onError={() => setError("Google signup failed")}
                            text="signup_with"
                        />
                    </div>
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-50">
                            {/* Spinner with subtle border and brand‑colored top */}
                            <div
                                className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin"
                                role="status"
                            ></div>
                        </div>
                    )}

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

            {showGoogleUserTypeModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
                    <div className="relative w-full max-w-sm p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">

                        <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100 mb-5">
                            Select Your User Type
                        </h2>

                        {userTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    setShowGoogleUserTypeModal(false);
                                    handleGoogleRegisterFinal(type);
                                }}
                                className="w-full text-center py-2 mb-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                            >
                                {type}
                            </button>
                        ))}

                        <button
                            onClick={() => setShowGoogleUserTypeModal(false)}
                            className="w-full text-center py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            )}

        </Layout>
    );
}