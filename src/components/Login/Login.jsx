import { useEffect, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Loading state changed:", loading);
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                "https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, rememberMe }),
                }
            );

            const data = await response.json();
            const token = data.accesstoken;

            if (response.ok && token) {
                const decoded = jwtDecode(token);
                const role = decoded.role;

                if (role === "student") {
                    localStorage.setItem("studentToken", token);
                } else if (role === "teacher") {
                    localStorage.setItem("teacherToken", token);
                } else {
                    localStorage.setItem("adminToken", token);
                }

                // localStorage.setItem("token", token);
                toast.success(
                    `Signed in to ${role.charAt(0).toUpperCase() + role.slice(1)} Portal`
                );

                if (role === "student") {
                    navigate("/studentHome");
                } else if (role === "teacher") {
                    navigate("/teacherHome");
                } else {
                    navigate("/adminDashboard");
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-white via-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.03%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

            <div className="relative w-full max-w-6xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left Side */}
                        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                                <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md"></div>
                            </div>
                            <div className="relative z-10 text-center">
                                <div className="mb-8">
                                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                        <FaUser className="text-3xl text-white" />
                                    </div>
                                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        Welcome Back!
                                    </h1>
                                    <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                                        Sign in to access your OpenSpace Capstone Repository System and continue your repository.
                                    </p>
                                </div>
                                <div className="space-y-4 text-sm text-blue-100">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                        <span>Seamless learning experience</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                        <span>Connect with educators</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                        <span>Track your progress</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col justify-center p-8 lg:p-12 bg-white/95 backdrop-blur-sm">
                            <div className="w-full max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-2">
                                        Login To OpenSpace
                                    </h2>
                                    <p className="text-gray-600">Enter your credentials to access your account</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                                placeholder="Your Email"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                                            >
                                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Remember</span>
                                        </label>
                                        <span
                                            onClick={() => setShowForgotPassword(true)}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                                        >
                                            Forgot password?
                                        </span>
                                    </div>

                                    {showForgotPassword && (
                                        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                                            loading
                                                ? "bg-gray-400 cursor-not-allowed opacity-70"
                                                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:opacity-90 hover:cursor-pointer"
                                        }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                </svg>
                                                Logging in...
                                            </div>
                                        ) : (
                                            "LOGIN"
                                        )}
                                    </button>

                                    <p className="font-normal text-gray-500 pt-6 pb-4 text-center">
                                        Dont have an account? Please Signup Here{" "}
                                        <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-600">
                                            Signup
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
